import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export const GREETING = "Bonjour, je suis Léa, conseillère chez Laveoo 👋 Vous souhaitez un nettoyage intérieur complet avec shampoing des sièges, ou une question sur nos tarifs ?";

export const SUGGESTIONS = ["Nettoyage intérieur complet", "Tarifs et délais", "Zone d'intervention"];

function getSessionId() {
    if (typeof window === "undefined") return "server";
    try {
        const existing = window.localStorage.getItem("laveoo_chat_session_id");
        if (existing) return existing;
        const fresh = crypto.randomUUID();
        window.localStorage.setItem("laveoo_chat_session_id", fresh);
        return fresh;
    } catch {
        return crypto.randomUUID();
    }
}

export default function useChat() {
    const [messages, setMessages] = useState([{ role: "assistant", content: GREETING }]);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState(null);
    const sessionIdRef = useRef(null);
    const location = useLocation();

    if (sessionIdRef.current === null) sessionIdRef.current = getSessionId();

    const sendMessage = async (text) => {
        const trimmed = text.trim();
        if (!trimmed || isSending) return;

        const nextMessages = [...messages, { role: "user", content: trimmed }];
        setMessages(nextMessages);
        setIsSending(true);
        setError(null);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    messages: nextMessages,
                    sessionId: sessionIdRef.current,
                    pageSource: location.pathname,
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                setError(data?.error || "Une erreur est survenue. Contactez-nous au 06 07 11 22 79.");
                setIsSending(false);
                return;
            }

            setMessages((current) => [...current, { role: "assistant", content: data.reply }]);
        } catch {
            setError("Connexion impossible. Contactez-nous directement au 06 07 11 22 79.");
        } finally {
            setIsSending(false);
        }
    };

    return { messages, isSending, error, sendMessage };
}
