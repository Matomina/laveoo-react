// Appelée directement par le site (voir ReservationPage.jsx) juste après
// l'insertion réussie d'une réservation en base — un Database Webhook aurait
// été plus robuste, mais le projet Supabase a un bug de plateforme qui
// empêche d'en créer (schéma interne "supabase_functions" manquant).
// Envoie un e-mail de confirmation au client, puis une notification push à
// l'appli admin installée sur le téléphone de Laveoo.
import webpush from "npm:web-push@3.6.7";
import { createClient } from "npm:@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL = Deno.env.get("INVOICE_FROM_EMAIL") ?? "Laveoo <onboarding@resend.dev>";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const VAPID_PUBLIC_KEY = Deno.env.get("VAPID_PUBLIC_KEY");
const VAPID_PRIVATE_KEY = Deno.env.get("VAPID_PRIVATE_KEY");
const VAPID_SUBJECT = Deno.env.get("VAPID_SUBJECT") ?? "mailto:laveoocontact@gmail.com";

if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
    webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

async function notifierAppliAdmin(reservation) {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
        console.error("notifierAppliAdmin: secret manquant", {
            SUPABASE_URL: !!SUPABASE_URL,
            SUPABASE_SERVICE_ROLE_KEY: !!SUPABASE_SERVICE_ROLE_KEY,
            VAPID_PUBLIC_KEY: !!VAPID_PUBLIC_KEY,
            VAPID_PRIVATE_KEY: !!VAPID_PRIVATE_KEY,
        });
        return;
    }

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: subscriptions, error: fetchError } = await supabaseAdmin
        .from("push_subscriptions")
        .select("id, subscription");

    if (fetchError) {
        console.error("notifierAppliAdmin: lecture push_subscriptions impossible", fetchError);
        return;
    }

    console.log(`notifierAppliAdmin: ${subscriptions?.length ?? 0} abonnement(s) trouvé(s)`);

    const payload = JSON.stringify({
        title: "Nouvelle réservation Laveoo",
        body: `${reservation.nom ?? "Un client"} vient de réserver — ${reservation.total_estime ?? ""} €`,
    });

    for (const row of subscriptions ?? []) {
        try {
            await webpush.sendNotification(row.subscription, payload);
            console.log(`notifierAppliAdmin: notification envoyée (abonnement ${row.id})`);
        } catch (pushError) {
            console.error(`notifierAppliAdmin: échec envoi (abonnement ${row.id})`, pushError?.statusCode, pushError?.body ?? pushError);
            // Abonnement expiré ou invalide : on le supprime pour ne pas réessayer indéfiniment.
            if (pushError?.statusCode === 404 || pushError?.statusCode === 410) {
                await supabaseAdmin.from("push_subscriptions").delete().eq("id", row.id);
            }
        }
    }
}

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function formatDateSouhaitee(dateSouhaitee) {
    if (!dateSouhaitee) return null;
    const [year, month, day] = dateSouhaitee.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const payload = await req.json();
        const reservation = payload.record;

        if (!reservation?.email) {
            return new Response(JSON.stringify({ error: "Pas d'e-mail sur cette réservation" }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        const dateFormatee = formatDateSouhaitee(reservation.date_souhaitee);
        const creneauTexte = dateFormatee
            ? ` pour le ${dateFormatee}${reservation.creneau ? ` (${reservation.creneau})` : ""}`
            : "";

        const resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${RESEND_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: FROM_EMAIL,
                to: [reservation.email],
                subject: "Votre demande de réservation Laveoo a bien été reçue",
                html: `<p>Bonjour ${reservation.nom ?? ""},</p><p>Votre demande de réservation${creneauTexte} a bien été prise en compte.</p><p>Un technicien va vous confirmer le créneau dans les plus brefs délais, par téléphone ou SMS.</p><p>À très vite,<br>L'équipe Laveoo</p>`,
            }),
        });

        const resendResult = await resendResponse.json();

        if (!resendResponse.ok) {
            return new Response(JSON.stringify({ error: resendResult }), {
                status: 502,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        try {
            await notifierAppliAdmin(reservation);
        } catch (notifError) {
            // Un souci de notification push ne doit jamais faire échouer
            // l'envoi de l'e-mail de confirmation, déjà réussi à ce stade.
            console.error("notifierAppliAdmin a levé une exception", notifError);
        }

        return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: String(error) }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});
