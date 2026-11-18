import { useEffect, useRef, useState } from "react";
import useChat, { SUGGESTIONS } from "../hooks/useChat";
import LeaAvatar from "./LeaAvatar";

function ChatBubble({ role, children }) {
    const isUser = role === "user";
    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-6 ${
                    isUser ? "bg-[#1F3A5F] text-white" : "bg-white text-[#1F3A5F]"
                }`}
            >
                {children}
            </div>
        </div>
    );
}

export default function ChatInline() {
    const [input, setInput] = useState("");
    const scrollRef = useRef(null);
    const { messages, isSending, error, sendMessage } = useChat();

    useEffect(() => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, isSending]);

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(input);
        setInput("");
    };

    return (
        <section className="bg-[#F5F5F5] py-16 sm:py-20" aria-labelledby="chat-inline-title">
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                <div className="reveal-card overflow-hidden rounded-[1.75rem] border border-[#93B8D8]/40 bg-white shadow-[0_20px_60px_rgba(31,58,95,0.12)]">
                    <div className="flex items-center justify-between gap-3 bg-[#1F3A5F] px-5 py-4 text-white">
                        <div className="flex items-center gap-3">
                            <LeaAvatar size={40} showStatus />
                            <div>
                                <p id="chat-inline-title" className="font-bold">
                                    Léa · Conseillère Laveoo
                                </p>
                                <p className="text-xs text-white/70">Répond à vos questions en direct</p>
                            </div>
                        </div>
                        <span className="hidden items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold sm:flex">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
                            En ligne
                        </span>
                    </div>

                    <div ref={scrollRef} className="max-h-80 space-y-3 overflow-y-auto bg-[#F8FAFC] px-4 py-4">
                        {messages.map((m, index) => (
                            <ChatBubble key={index} role={m.role}>
                                {m.content}
                            </ChatBubble>
                        ))}
                        {isSending && (
                            <ChatBubble role="assistant">
                                <span className="inline-flex gap-1">
                                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#1F3A5F]/40 [animation-delay:-0.2s]" />
                                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#1F3A5F]/40 [animation-delay:-0.1s]" />
                                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#1F3A5F]/40" />
                                </span>
                            </ChatBubble>
                        )}
                        {error && <p className="text-center text-xs font-semibold text-red-600">{error}</p>}
                    </div>

                    {messages.length === 1 && (
                        <div className="flex flex-wrap gap-2 bg-[#F8FAFC] px-4 pb-4">
                            {SUGGESTIONS.map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => sendMessage(s)}
                                    className="rounded-full border border-[#93B8D8]/50 bg-white px-3 py-1.5 text-xs font-semibold text-[#1F3A5F] transition hover:border-[#1769E8] hover:bg-[#EAF2FB]"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-slate-100 p-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Votre message à Léa..."
                            aria-label="Votre message"
                            disabled={isSending}
                            className="min-w-0 flex-1 rounded-full border border-[#93B8D8]/50 bg-[#F8FAFC] px-4 py-2.5 text-sm outline-none focus:border-[#1769E8] focus:bg-white"
                        />
                        <button
                            type="submit"
                            disabled={isSending || !input.trim()}
                            aria-label="Envoyer"
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1769E8] text-white transition disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                <path d="M3 11.5 20.5 3 14 20.5l-3-7.5-8-1.5Z" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
