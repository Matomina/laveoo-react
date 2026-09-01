import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

const STATUT_LABELS = {
    en_attente: "En attente",
    confirmee: "Confirmée",
    terminee: "Terminée",
    annulee: "Annulée",
};

const STATUT_STYLES = {
    en_attente: "bg-amber-50 text-amber-700",
    confirmee: "bg-[#EAF2FB] text-[#1F3A5F]",
    terminee: "bg-emerald-50 text-emerald-700",
    annulee: "bg-red-50 text-red-600",
};

export default function AdminDashboardPage() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        supabase
            .from("reservations")
            .select("*")
            .order("created_at", { ascending: false })
            .then(({ data, error: fetchError }) => {
                if (!active) return;
                if (fetchError) {
                    setError("Impossible de charger les réservations.");
                } else {
                    setReservations(data ?? []);
                }
                setLoading(false);
            });

        return () => {
            active = false;
        };
    }, []);

    const updateStatut = async (id, statut) => {
        setReservations((list) => list.map((r) => (r.id === id ? { ...r, statut } : r)));
        const { error: updateError } = await supabase.from("reservations").update({ statut }).eq("id", id);
        if (updateError) {
            setError("Le changement de statut n'a pas pu être enregistré.");
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-black text-[#1F3A5F]">Réservations</h1>
            <p className="mt-1 text-sm text-[#595959]">Toutes les demandes reçues depuis le formulaire du site.</p>

            {loading && <p className="mt-6 text-sm text-[#595959]">Chargement...</p>}
            {error && <p className="mt-6 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}

            {!loading && !error && reservations.length === 0 && (
                <p className="mt-6 text-sm text-[#595959]">Aucune réservation pour l'instant.</p>
            )}

            {!loading && reservations.length > 0 && (
                <div className="mt-6 overflow-x-auto rounded-2xl border border-[#93B8D8]/40 bg-white">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#F8FAFC] text-xs font-bold uppercase tracking-wide text-[#1F3A5F]/60">
                            <tr>
                                <th className="px-4 py-3">Reçue le</th>
                                <th className="px-4 py-3">Client</th>
                                <th className="px-4 py-3">Adresse</th>
                                <th className="px-4 py-3">Date / créneau souhaités</th>
                                <th className="px-4 py-3">Total</th>
                                <th className="px-4 py-3">Statut</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((r) => (
                                <tr key={r.id} className="border-t border-slate-100 align-top">
                                    <td className="whitespace-nowrap px-4 py-3">
                                        {new Date(r.created_at).toLocaleDateString("fr-FR")}
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="font-semibold text-[#1F3A5F]">{r.nom}</p>
                                        <p className="text-xs text-[#595959]">{r.email}</p>
                                        <p className="text-xs text-[#595959]">{r.telephone}</p>
                                        {r.siret && <p className="text-xs text-[#595959]">SIRET : {r.siret}</p>}
                                    </td>
                                    <td className="px-4 py-3 text-[#595959]">{r.adresse}</td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        {r.date_souhaitee
                                            ? new Date(r.date_souhaitee).toLocaleDateString("fr-FR")
                                            : "-"}
                                        {r.creneau ? ` · ${r.creneau}` : ""}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3 font-black text-[#102A59]">
                                        {r.total_estime} €
                                    </td>
                                    <td className="px-4 py-3">
                                        <select
                                            value={r.statut}
                                            onChange={(e) => updateStatut(r.id, e.target.value)}
                                            className={`rounded-full border-0 px-3 py-1.5 text-xs font-bold outline-none ${STATUT_STYLES[r.statut] ?? "bg-slate-100 text-[#1F3A5F]"}`}
                                        >
                                            {Object.entries(STATUT_LABELS).map(([value, label]) => (
                                                <option key={value} value={value}>{label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3 text-right">
                                        <Link
                                            to={`/admin/factures/nouvelle?reservation=${r.id}`}
                                            className="text-sm font-semibold text-[#1769E8] underline"
                                        >
                                            Créer la facture
                                        </Link>
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
