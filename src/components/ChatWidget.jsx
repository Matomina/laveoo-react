import { useEffect, useRef, useState } from "react";
import useChat, { SUGGESTIONS } from "../hooks/useChat";
import LeaAvatar from "./LeaAvatar";

function ChatBubble({ role, children }) {
    const isUser = role === "user";
    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-6 ${
                    isUser ? "bg-[#1F3A5F] text-white" : "bg-[#F5F5F5] text-[#1F3A5F]"
                }`}
            >
                {children}
            </div>
        </div>
    );
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const scrollRef = useRef(null);
    const { messages, isSending, error, sendMessage } = useChat();

    useEffect(() => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, isSending, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(input);
        setInput("");
    };

    const handleSuggestion = (text) => {
        sendMessage(text);
    };

    return (
        <>
            {isOpen && (
                <div className="fixed bottom-24 left-5 z-40 flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-[1.75rem] border border-[#93B8D8]/40 bg-white shadow-[0_24px_60px_rgba(31,58,95,0.25)] sm:bottom-28 sm:left-7">
                    <div className="flex items-center justify-between bg-[#1F3A5F] px-5 py-4 text-white">
                        <div className="flex items-center gap-3">
                            <LeaAvatar size={36} showStatus />
                            <div>
                                <p className="font-bold">Léa</p>
                                <p className="text-xs text-white/70">Conseillère Laveoo</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="hidden items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white sm:flex">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
                                En ligne
                            </span>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                aria-label="Fermer le chat"
                                className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
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
                        <div className="flex flex-wrap gap-2 px-4 pb-3">
                            {SUGGESTIONS.map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => handleSuggestion(s)}
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
                            placeholder="Votre question..."
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
            )}

            <button
                type="button"
                onClick={() => setIsOpen((v) => !v)}
                aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat avec Léa, conseillère Laveoo"}
                className="fixed bottom-5 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#1F3A5F] text-white shadow-[0_10px_30px_rgba(31,58,95,0.4)] transition duration-300 hover:scale-105 hover:shadow-[0_14px_36px_rgba(31,58,95,0.5)] sm:bottom-7 sm:left-7"
            >
                {isOpen ? <span className="text-xl">✕</span> : <LeaAvatar size={56} showStatus />}
            </button>
        </>
    );
}
