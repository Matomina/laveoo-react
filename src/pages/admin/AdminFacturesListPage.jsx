import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { downloadInvoicePdf } from "../../utils/generateInvoicePdf";
import { sendInvoiceEmail } from "../../utils/sendInvoiceEmail";

export default function AdminFacturesListPage() {
    const [factures, setFactures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [sendingId, setSendingId] = useState(null);
    const [sendError, setSendError] = useState("");

    useEffect(() => {
        let active = true;
        supabase
            .from("factures")
            .select("*")
            .order("created_at", { ascending: false })
            .then(({ data, error: fetchError }) => {
                if (!active) return;
                if (fetchError) {
                    setError("Impossible de charger les factures.");
                } else {
                    setFactures(data ?? []);
                }
                setLoading(false);
            });
        return () => {
            active = false;
        };
    }, []);

    const handleSend = async (facture) => {
        setSendingId(facture.id);
        setSendError("");
        try {
            await sendInvoiceEmail(facture);
            const envoyeeLe = new Date().toISOString();
            await supabase.from("factures").update({ envoyee_le: envoyeeLe }).eq("id", facture.id);
            setFactures((list) => list.map((f) => (f.id === facture.id ? { ...f, envoyee_le: envoyeeLe } : f)));
        } catch (err) {
            setSendError(`${facture.numero} : ${err.message}`);
        } finally {
            setSendingId(null);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-[#1F3A5F]">Factures</h1>
                    <p className="mt-1 text-sm text-[#595959]">Toutes les factures générées.</p>
                </div>
                <Link
                    to="/admin/factures/nouvelle"
                    className="premium-button inline-flex min-h-12 items-center justify-center rounded-full bg-[#1769E8] px-6 text-sm font-bold text-white"
                >
                    + Nouvelle facture
                </Link>
            </div>

            {loading && <p className="mt-6 text-sm text-[#595959]">Chargement...</p>}
            {error && <p className="mt-6 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}
            {sendError && (
                <p className="mt-6 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{sendError}</p>
            )}

            {!loading && !error && factures.length === 0 && (
                <p className="mt-6 text-sm text-[#595959]">Aucune facture pour l'instant.</p>
            )}

            {!loading && factures.length > 0 && (
                <div className="mt-6 overflow-x-auto rounded-2xl border border-[#93B8D8]/40 bg-white">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#F8FAFC] text-xs font-bold uppercase tracking-wide text-[#1F3A5F]/60">
                            <tr>
                                <th className="px-4 py-3">N°</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Client</th>
                                <th className="px-4 py-3">Total</th>
                                <th className="px-4 py-3">Envoyée</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {factures.map((f) => (
                                <tr key={f.id} className="border-t border-slate-100">
                                    <td className="px-4 py-3 font-bold text-[#1F3A5F]">{f.numero}</td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        {new Date(f.created_at).toLocaleDateString("fr-FR")}
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="font-semibold text-[#1F3A5F]">{f.client_nom}</p>
                                        <p className="text-xs text-[#595959]">{f.client_email}</p>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3 font-black text-[#102A59]">
                                        {Number(f.montant_total).toFixed(2)} €
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3 text-xs text-[#595959]">
                                        {f.envoyee_le ? new Date(f.envoyee_le).toLocaleDateString("fr-FR") : "—"}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-4">
                                            <button
                                                type="button"
                                                onClick={() => downloadInvoicePdf(f)}
                                                className="text-sm font-semibold text-[#1769E8] underline"
                                            >
                                                Télécharger
                                            </button>
                                            <button
                                                type="button"
                                                disabled={sendingId === f.id}
                                                onClick={() => handleSend(f)}
                                                className="text-sm font-semibold text-[#1F3A5F] underline disabled:opacity-50"
                                            >
                                                {sendingId === f.id ? "Envoi..." : "Envoyer par email"}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
