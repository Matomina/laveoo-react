import jsPDF from "jspdf";
import { companyInfo } from "../data/companyInfo";

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

export async function generateInvoicePdf(facture) {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const marginX = 18;
    let y = 20;

    try {
        const logo = await loadImage(companyInfo.logo);
        const logoWidth = 34;
        const logoHeight = (logo.height / logo.width) * logoWidth;
        doc.addImage(logo, "PNG", marginX, y, logoWidth, logoHeight);
    } catch {
        // logo optionnel : on continue sans si le chargement échoue
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(31, 58, 95);
    doc.text("FACTURE", pageWidth - marginX, y + 6, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(89, 89, 89);
    doc.text(`N° ${facture.numero}`, pageWidth - marginX, y + 13, { align: "right" });
    doc.text(
        `Date : ${new Date(facture.created_at ?? Date.now()).toLocaleDateString("fr-FR")}`,
        pageWidth - marginX,
        y + 18,
        { align: "right" }
    );
    if (facture.date_prestation) {
        doc.text(
            `Prestation du ${new Date(facture.date_prestation).toLocaleDateString("fr-FR")}`,
            pageWidth - marginX,
            y + 23,
            { align: "right" }
        );
    }

    y += 38;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(31, 58, 95);
    doc.text(companyInfo.name, marginX, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(89, 89, 89);
    doc.text(
        [
            companyInfo.address,
            `SIRET : ${companyInfo.siret}`,
            `Tél : ${companyInfo.phoneDisplay}`,
            `Email : ${companyInfo.email}`,
        ],
        marginX,
        y + 6
    );

    const clientX = pageWidth - marginX - 72;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(31, 58, 95);
    doc.text("Facturé à :", clientX, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(89, 89, 89);
    const clientLines = [facture.client_nom];
    if (facture.client_adresse) clientLines.push(facture.client_adresse);
    if (facture.client_siret) clientLines.push(`SIRET : ${facture.client_siret}`);
    if (facture.client_telephone) clientLines.push(facture.client_telephone);
    if (facture.client_email) clientLines.push(facture.client_email);
    doc.text(clientLines, clientX, y + 6);

    y += 42;

    doc.setFillColor(248, 250, 252);
    doc.rect(marginX, y, pageWidth - marginX * 2, 9, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(31, 58, 95);
    doc.text("Description", marginX + 3, y + 6);
    doc.text("Montant", pageWidth - marginX - 3, y + 6, { align: "right" });
    y += 9;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    const lignes = facture.lignes ?? [];
    lignes.forEach((ligne) => {
        y += 9;
        doc.setDrawColor(230, 230, 230);
        doc.line(marginX, y, pageWidth - marginX, y);
        doc.text(String(ligne.description ?? ""), marginX + 3, y - 3);
        doc.text(`${Number(ligne.montant ?? 0).toFixed(2)} €`, pageWidth - marginX - 3, y - 3, { align: "right" });
    });

    y += 14;
    doc.setDrawColor(31, 58, 95);
    doc.setLineWidth(0.6);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 9;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(31, 58, 95);
    doc.text("Total TTC", marginX, y);
    doc.text(`${Number(facture.montant_total ?? 0).toFixed(2)} €`, pageWidth - marginX, y, { align: "right" });

    y += 12;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text(companyInfo.tvaMention, marginX, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(160, 160, 160);
    doc.text(
        `${companyInfo.name} — ${companyInfo.address} — SIRET ${companyInfo.siret}`,
        pageWidth / 2,
        285,
        { align: "center" }
    );

    return doc;
}

export async function downloadInvoicePdf(facture) {
    const doc = await generateInvoicePdf(facture);
    doc.save(`${facture.numero}.pdf`);
}
