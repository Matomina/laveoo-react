import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

export default function AdminLoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

        setLoading(false);

        if (signInError) {
            setError("Email ou mot de passe incorrect.");
            return;
        }

        navigate("/admin");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F5F5F5] px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm rounded-2xl border border-[#93B8D8]/50 bg-white p-8 shadow-[0_12px_34px_rgba(31,58,95,0.08)]"
            >
                <h1 className="text-xl font-black text-[#1F3A5F]">Espace admin Laveoo</h1>
                <p className="mt-1 text-sm text-[#595959]">Connecte-toi pour gérer les réservations et factures.</p>

                <div className="mt-6">
                    <label className="text-sm font-semibold text-[#1F3A5F]">Email</label>
                    <input
                        type="email"
                        required
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-[#93B8D8]/50 bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#1769E8] focus:bg-white"
                    />
                </div>

                <div className="mt-4">
                    <label className="text-sm font-semibold text-[#1F3A5F]">Mot de passe</label>
                    <input
                        type="password"
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-[#93B8D8]/50 bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#1769E8] focus:bg-white"
                    />
                </div>

                {error && (
                    <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="premium-button mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#1F3A5F] px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Connexion..." : "Se connecter"}
                </button>
            </form>
        </div>
    );
}
