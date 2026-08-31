import { supabase } from "../lib/supabaseClient";
import { generateInvoicePdf } from "./generateInvoicePdf";

export async function sendInvoiceEmail(facture) {
    if (!facture.client_email) {
        throw new Error("Ce client n'a pas d'adresse e-mail enregistrée.");
    }

    const doc = await generateInvoicePdf(facture);
    const pdfBase64 = doc.output("datauristring").split(",")[1];

    const { data: sessionData } = await supabase.auth.getSession();
    const accessToken = sessionData.session?.access_token;

    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-invoice-email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
            to: facture.client_email,
            clientName: facture.client_nom,
            numero: facture.numero,
            pdfBase64,
        }),
    });

    const result = await response.json();

    if (!response.ok || result.error) {
        const message = typeof result.error === "string" ? result.error : "Échec de l'envoi de l'email.";
        throw new Error(message);
    }

    return result;
}
