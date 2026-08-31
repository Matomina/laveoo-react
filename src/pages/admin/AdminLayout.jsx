import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

export default function AdminLayout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/admin/login");
    };

    const navLinkClass = ({ isActive }) =>
        `text-sm font-bold ${isActive ? "text-[#1769E8]" : "text-[#595959] hover:text-[#1F3A5F]"}`;

    return (
        <div className="min-h-screen bg-[#F5F5F5]">
            <header className="flex items-center justify-between border-b border-[#93B8D8]/30 bg-white px-6 py-4">
                <div className="flex items-center gap-8">
                    <p className="font-black text-[#1F3A5F]">Espace admin Laveoo</p>
                    <nav className="flex gap-6">
                        <NavLink to="/admin" end className={navLinkClass}>Réservations</NavLink>
                        <NavLink to="/admin/factures" className={navLinkClass}>Factures</NavLink>
                        <NavLink to="/admin/factures/nouvelle" className={navLinkClass}>Nouvelle facture</NavLink>
                    </nav>
                </div>
                <button onClick={handleLogout} className="text-sm font-semibold text-[#595959] hover:text-[#1F3A5F]">
                    Se déconnecter
                </button>
            </header>
            <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    );
}
