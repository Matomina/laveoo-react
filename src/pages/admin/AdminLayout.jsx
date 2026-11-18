import { createContext, useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import AdminInstallButton from "../../components/AdminInstallButton";
import AdminNotificationsButton from "../../components/AdminNotificationsButton";

const LAST_SEEN_KEY = "laveoo_dernier_vu_resa_at";

// Permet à AdminDashboardPage de savoir quelles réservations sont "nouvelles"
// (arrivées depuis la dernière visite) et de prévenir immédiatement ce layout
// une fois qu'elles ont été vues, sans dépendre d'une nouvelle requête réseau.
const AdminBadgeContext = createContext({
    getLastSeenAt: () => new Date(0).toISOString(),
    markReservationsSeen: () => {},
});

export function useAdminBadge() {
    return useContext(AdminBadgeContext);
}

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [pendingCount, setPendingCount] = useState(0);

    // Nombre de réservations arrivées depuis la dernière fois que l'admin a
    // ouvert l'onglet "Réservations", affiché en bulle rouge sur l'onglet.
    useEffect(() => {
        let active = true;
        const cutoff = localStorage.getItem(LAST_SEEN_KEY) ?? new Date(0).toISOString();
        supabase
            .from("reservations")
            .select("id", { count: "exact", head: true })
            .gt("created_at", cutoff)
            .then(({ count }) => {
                if (active) setPendingCount(count ?? 0);
            });
        return () => {
            active = false;
        };
    }, [location.pathname]);

    // Remet la bulle de notification de l'icône à zéro dès que l'admin ouvre
    // l'espace (le compteur est incrémenté par admin-sw.js à chaque
    // notification reçue, et stocké en Cache Storage plutôt qu'IndexedDB —
    // voir admin-sw.js pour le détail du bug Safari évité).
    useEffect(() => {
        if ("clearAppBadge" in navigator) navigator.clearAppBadge().catch(() => {});
        caches
            .open("laveoo-admin-badge")
            .then((cache) => cache.put("https://laveoo-badge.local/count", new Response("0")))
            .catch(() => {
                // Tant pis, la bulle restera affichée jusqu'à la prochaine notif.
            });
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/admin/login");
    };

    const navLinkClass = ({ isActive }) =>
        `text-sm font-bold ${isActive ? "text-[#1769E8]" : "text-[#595959] hover:text-[#1F3A5F]"}`;

    const badgeValue = {
        getLastSeenAt: () => localStorage.getItem(LAST_SEEN_KEY) ?? new Date(0).toISOString(),
        markReservationsSeen: () => {
            localStorage.setItem(LAST_SEEN_KEY, new Date().toISOString());
            setPendingCount(0);
        },
    };

    return (
        <AdminBadgeContext.Provider value={badgeValue}>
            <div className="min-h-screen bg-[#F5F5F5]">
                <header className="flex items-center justify-between border-b border-[#93B8D8]/30 bg-white px-6 py-4">
                    <div className="flex items-center gap-8">
                        <p className="font-black text-[#1F3A5F]">Espace admin Laveoo</p>
                        <nav className="flex gap-6">
                            <NavLink to="/admin" end className={`relative ${navLinkClass({ isActive: location.pathname === "/admin" })}`}>
                                Réservations
                                {pendingCount > 0 && (
                                    <span className="absolute -right-3 -top-2.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-bold text-white">
                                        {pendingCount}
                                    </span>
                                )}
                            </NavLink>
                            <NavLink to="/admin/factures" className={navLinkClass}>Factures</NavLink>
                            <NavLink to="/admin/factures/nouvelle" className={navLinkClass}>Nouvelle facture</NavLink>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <AdminInstallButton />
                        <AdminNotificationsButton />
                        <button onClick={handleLogout} className="text-sm font-semibold text-[#595959] hover:text-[#1F3A5F]">
                            Se déconnecter
                        </button>
                    </div>
                </header>
                <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                    <Outlet />
                </main>
            </div>
        </AdminBadgeContext.Provider>
    );
}
