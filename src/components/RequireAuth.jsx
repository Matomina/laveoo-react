import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function RequireAuth() {
    const [session, setSession] = useState(undefined);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => setSession(data.session));
        const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
            setSession(nextSession);
        });
        return () => listener.subscription.unsubscribe();
    }, []);

    if (session === undefined) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F5F5F5]">
                <p className="text-sm font-semibold text-[#595959]">Chargement...</p>
            </div>
        );
    }

    if (!session) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
}
