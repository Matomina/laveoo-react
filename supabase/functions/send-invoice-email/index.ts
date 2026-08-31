import { createClient } from "jsr:@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL = Deno.env.get("INVOICE_FROM_EMAIL") ?? "Laveoo <onboarding@resend.dev>";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const authHeader = req.headers.get("Authorization") ?? "";
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
            global: { headers: { Authorization: authHeader } },
        });

        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user) {
            return new Response(JSON.stringify({ error: "Non autorisé" }), {
                status: 401,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        const { to, clientName, numero, pdfBase64 } = await req.json();

        if (!to || !numero || !pdfBase64) {
            return new Response(JSON.stringify({ error: "Champs manquants" }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        const resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${RESEND_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: FROM_EMAIL,
                to: [to],
                subject: `Votre facture Laveoo - ${numero}`,
                html: `<p>Bonjour ${clientName ?? ""},</p><p>Veuillez trouver ci-joint votre facture <strong>${numero}</strong> pour la prestation Laveoo.</p><p>Merci de votre confiance.</p><p>L'équipe Laveoo</p>`,
                attachments: [
                    {
                        filename: `${numero}.pdf`,
                        content: pdfBase64,
                    },
                ],
            }),
        });

        const resendResult = await resendResponse.json();

        if (!resendResponse.ok) {
            return new Response(JSON.stringify({ error: resendResult }), {
                status: 502,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
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
