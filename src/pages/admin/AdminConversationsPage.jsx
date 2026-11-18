import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

function groupBySession(rows) {
    const bySession = new Map();
    for (const row of rows) {
        if (!bySession.has(row.session_id)) bySession.set(row.session_id, []);
        bySession.get(row.session_id).push(row);
    }
    return Array.from(bySession.entries())
        .map(([sessionId, messages]) => {
            const sorted = [...messages].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            const firstUserMessage = sorted.find((m) => m.role === "user");
            return {
                sessionId,
                messages: sorted,
                startedAt: sorted[0]?.created_at,
                lastAt: sorted[sorted.length - 1]?.created_at,
                pageSource: sorted[0]?.page_source,
                preview: firstUserMessage?.content ?? sorted[0]?.content ?? "",
                count: sorted.length,
            };
        })
        .sort((a, b) => new Date(b.lastAt) - new Date(a.lastAt));
}

export default function AdminConversationsPage() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [openSessionId, setOpenSessionId] = useState(null);

    useEffect(() => {
        let active = true;
        supabase
            .from("chat_messages")
            .select("*")
            .order("created_at", { ascending: true })
            .limit(2000)
            .then(({ data, error: fetchError }) => {
                if (!active) return;
                if (fetchError) {
                    setError("Impossible de charger les conversations.");
                } else {
                    setRows(data ?? []);
                }
                setLoading(false);
            });
        return () => {
            active = false;
        };
    }, []);

    const conversations = groupBySession(rows);

    return (
        <div>
            <div>
                <h1 className="text-2xl font-black text-[#1F3A5F]">Conversations avec Léa</h1>
                <p className="mt-1 text-sm text-[#595959]">Historique des discussions menées sur le site avec l'assistant virtuel.</p>
            </div>

            {loading && <p className="mt-6 text-sm text-[#595959]">Chargement...</p>}
            {error && <p className="mt-6 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}

            {!loading && !error && conversations.length === 0 && (
                <p className="mt-6 text-sm text-[#595959]">Aucune conversation pour l'instant.</p>
            )}

            {!loading && conversations.length > 0 && (
                <div className="mt-6 space-y-3">
                    {conversations.map((conv) => {
                        const isOpen = openSessionId === conv.sessionId;
                        return (
                            <div key={conv.sessionId} className="overflow-hidden rounded-2xl border border-[#93B8D8]/40 bg-white">
                                <button
                                    type="button"
                                    onClick={() => setOpenSessionId(isOpen ? null : conv.sessionId)}
                                    className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
                                >
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-[#1F3A5F]">{conv.preview || "(message vide)"}</p>
                                        <p className="mt-1 text-xs text-[#595959]">
                                            {new Date(conv.startedAt).toLocaleString("fr-FR")}
                                            {conv.pageSource ? ` · depuis ${conv.pageSource}` : ""}
                                            {` · ${conv.count} message${conv.count > 1 ? "s" : ""}`}
                                        </p>
                                    </div>
                                    <span className="shrink-0 text-xs font-bold text-[#1769E8]">{isOpen ? "Masquer" : "Voir"}</span>
                                </button>

                                {isOpen && (
                                    <div className="space-y-3 border-t border-slate-100 bg-[#F8FAFC] px-4 py-4">
                                        {conv.messages.map((m) => (
                                            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                                <div
                                                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-6 ${
                                                        m.role === "user" ? "bg-[#1F3A5F] text-white" : "bg-white text-[#1F3A5F]"
                                                    }`}
                                                >
                                                    {m.content}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
