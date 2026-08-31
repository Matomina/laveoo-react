import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { downloadInvoicePdf } from "../../utils/generateInvoicePdf";

function makeEmptyLigne() {
    return { uid: Math.random().toString(36).slice(2), description: "", montant: "" };
}

export default function AdminNewFacturePage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const reservationId = searchParams.get("reservation");

    const [loadingReservation, setLoadingReservation] = useState(Boolean(reservationId));
    const [clientNom, setClientNom] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [clientAdresse, setClientAdresse] = useState("");
    const [clientTelephone, setClientTelephone] = useState("");
    const [datePrestation, setDatePrestation] = useState("");
    const [lignes, setLignes] = useState([makeEmptyLigne()]);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!reservationId) return;

        supabase
            .from("reservations")
            .select("*")
            .eq("id", reservationId)
            .single()
            .then(({ data, error: fetchError }) => {
                if (fetchError || !data) {
                    setError("Impossible de charger cette réservation.");
                    setLoadingReservation(false);
                    return;
                }
                setClientNom(data.nom ?? "");
                setClientEmail(data.email ?? "");
                setClientAdresse(data.adresse ?? "");
                setClientTelephone(data.telephone ?? "");
                setDatePrestation(data.date_souhaitee ?? "");

                const vehiculeLignes = (data.vehicules ?? []).map((v) => {
                    const parts = [`Nettoyage intérieur — ${v.plan}`];
                    let montant = Number(v.prix ?? 0);
                    if (v.option1h) {
                        parts.push("(+ option 1h)");
                    }
                    return { uid: Math.random().toString(36).slice(2), description: parts.join(" "), montant: String(montant) };
                });

                setLignes(vehiculeLignes.length > 0 ? vehiculeLignes : [makeEmptyLigne()]);
                setLoadingReservation(false);
            });
    }, [reservationId]);

    const updateLigne = (uid, patch) => {
        setLignes((list) => list.map((l) => (l.uid === uid ? { ...l, ...patch } : l)));
    };

    const addLigne = () => setLignes((list) => [...list, makeEmptyLigne()]);
    const removeLigne = (uid) => setLignes((list) => (list.length > 1 ? list.filter((l) => l.uid !== uid) : list));

    const total = lignes.reduce((sum, l) => sum + (Number(l.montant) || 0), 0);

    const canSubmit =
        clientNom.trim() &&
        lignes.every((l) => l.description.trim() && l.montant !== "" && !Number.isNaN(Number(l.montant)));

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");

        const payload = {
            reservation_id: reservationId || null,
            client_nom: clientNom.trim(),
            client_email: clientEmail.trim() || null,
            client_adresse: clientAdresse.trim() || null,
            client_telephone: clientTelephone.trim() || null,
            date_prestation: datePrestation || null,
            lignes: lignes.map((l) => ({ description: l.description.trim(), montant: Number(l.montant) })),
            montant_total: total,
        };

        const { data, error: insertError } = await supabase
            .from("factures")
            .insert(payload)
            .select()
            .single();

        if (insertError || !data) {
            setError("La facture n'a pas pu être enregistrée.");
            setSaving(false);
            return;
        }

        if (reservationId) {
            await supabase.from("reservations").update({ statut: "terminee" }).eq("id", reservationId);
        }

        await downloadInvoicePdf(data);

        setSaving(false);
        navigate("/admin/factures");
    };

    if (loadingReservation) {
        return <p className="text-sm text-[#595959]">Chargement de la réservation...</p>;
    }

    return (
        <div>
            <h1 className="text-2xl font-black text-[#1F3A5F]">Nouvelle facture</h1>
            <p className="mt-1 text-sm text-[#595959]">
                {reservationId
                    ? "Les informations ont été pré-remplies depuis la réservation. Vérifie-les avant de générer la facture."
                    : "Saisis les informations du client pour une prestation qui n'a pas été réservée en ligne."}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div className="rounded-2xl border border-[#93B8D8]/50 bg-white p-6">
                    <p className="text-sm font-black uppercase tracking-[0.14em] text-[#1F3A5F]/60">Client</p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label className="text-sm font-semibold text-[#1F3A5F]">Nom et prénom</label>
                            <input
                                type="text"
                                required
                                value={clientNom}
                                onChange={(e) => setClientNom(e.target.value)}
                                className="mt-1.5 w-full rounded-xl border border-[#93B8D8]/50 bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#1769E8] focus:bg-white"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="text-sm font-semibold text-[#1F3A5F]">Adresse</label>
                            <input
                                type="text"
                                value={clientAdresse}
                                onChange={(e) => setClientAdresse(e.target.value)}
                                className="mt-1.5 w-full rounded-xl border border-[#93B8D8]/50 bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#1769E8] focus:bg-white"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-[#1F3A5F]">E-mail</label>
                            <input
                                type="email"
                                value={clientEmail}
                                onChange={(e) => setClientEmail(e.target.value)}
                                className="mt-1.5 w-full rounded-xl border border-[#93B8D8]/50 bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#1769E8] focus:bg-white"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-[#1F3A5F]">Téléphone</label>
                            <input
                                type="tel"
                                value={clientTelephone}
                                onChange={(e) => setClientTelephone(e.target.value)}
                                className="mt-1.5 w-full rounded-xl border border-[#93B8D8]/50 bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#1769E8] focus:bg-white"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-[#1F3A5F]">Date de la prestation</label>
                            <input
                                type="date"
                                value={datePrestation}
                                onChange={(e) => setDatePrestation(e.target.value)}
                                className="mt-1.5 w-full rounded-xl border border-[#93B8D8]/50 bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#1769E8] focus:bg-white"
                            />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-[#93B8D8]/50 bg-white p-6">
                    <p className="text-sm font-black uppercase tracking-[0.14em] text-[#1F3A5F]/60">
                        Détail de la prestation
                    </p>
                    <div className="mt-4 space-y-3">
                        {lignes.map((l) => (
                            <div key={l.uid} className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Description (ex: Nettoyage intérieur berline)"
                                    value={l.description}
                                    onChange={(e) => updateLigne(l.uid, { description: e.target.value })}
                                    className="flex-1 rounded-xl border border-[#93B8D8]/50 bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#1769E8] focus:bg-white"
                                />
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="Montant €"
                                    value={l.montant}
                                    onChange={(e) => updateLigne(l.uid, { montant: e.target.value })}
                                    className="w-32 rounded-xl border border-[#93B8D8]/50 bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#1769E8] focus:bg-white"
                                />
                                {lignes.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeLigne(l.uid)}
                                        className="px-2 text-sm font-semibold text-[#595959] hover:text-red-600"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={addLigne}
                        className="mt-4 rounded-xl border-2 border-dashed border-[#93B8D8]/60 px-4 py-2 text-sm font-bold text-[#1F3A5F] hover:border-[#1769E8]"
                    >
                        + Ajouter une ligne
                    </button>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                        <p className="font-black text-[#1F3A5F]">Total TTC</p>
                        <p className="text-2xl font-black text-[#1769E8]">{total.toFixed(2)} €</p>
                    </div>
                    <p className="mt-1 text-xs text-[#595959]">TVA non applicable, art. 293 B du CGI.</p>
                </div>

                {error && <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}

                <button
                    type="submit"
                    disabled={!canSubmit || saving}
                    className="premium-button inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#1F3A5F] px-8 py-4 text-base font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {saving ? "Génération..." : "Générer la facture (PDF)"}
                </button>
            </form>
        </div>
    );
}
