import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

async function ensureSubscriptionSaved() {
    const registration = await navigator.serviceWorker.register("/admin-sw.js", { scope: "/admin/" });
    await navigator.serviceWorker.ready;

    let subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
        subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });
    }

    const json = subscription.toJSON();
    const { data: existing } = await supabase
        .from("push_subscriptions")
        .select("id")
        .eq("subscription->>endpoint", json.endpoint)
        .maybeSingle();

    if (!existing) {
        const { error } = await supabase.from("push_subscriptions").insert({ subscription: json });
        if (error) throw error;
    }
}

export default function AdminNotificationsButton() {
    // "checking" | "prompt" | "denied" | "ready" | "error" | "unsupported"
    const [state, setState] = useState("checking");
    const [busy, setBusy] = useState(false);
    const [errorDetail, setErrorDetail] = useState("");

    useEffect(() => {
        if (!("serviceWorker" in navigator) || typeof Notification === "undefined" || !("PushManager" in window)) {
            setState("unsupported");
            return;
        }

        if (Notification.permission === "denied") {
            setState("denied");
            return;
        }

        if (Notification.permission === "default") {
            setState("prompt");
            return;
        }

        // Permission déjà accordée : on (ré)enregistre l'abonnement en
        // silence, sans attendre de clic — sinon un échec d'enregistrement
        // précédent (ex. base de données) laisse l'utilisateur bloqué sans
        // aucun moyen de relancer l'opération.
        ensureSubscriptionSaved()
            .then(() => setState("ready"))
            .catch((err) => {
                setErrorDetail(err?.message ?? String(err));
                setState("error");
            });
    }, []);

    if (state === "checking" || state === "ready" || state === "unsupported") return null;

    const handleClick = async () => {
        setBusy(true);
        try {
            const result = await Notification.requestPermission();
            if (result !== "granted") {
                setState(result === "denied" ? "denied" : "prompt");
                return;
            }
            await ensureSubscriptionSaved();
            setState("ready");
        } catch (err) {
            setErrorDetail(err?.message ?? String(err));
            setState("error");
        } finally {
            setBusy(false);
        }
    };

    if (state === "denied") {
        return (
            <p className="max-w-xs text-right text-xs text-[#595959]">
                Notifications bloquées sur cet appareil. Active-les dans Réglages → Notifications → Laveoo.
            </p>
        );
    }

    return (
        <div className="flex flex-col items-end gap-1">
            <button
                type="button"
                onClick={handleClick}
                disabled={busy}
                className="rounded-full border border-[#1F3A5F] px-4 py-2 text-sm font-bold text-[#1F3A5F] hover:bg-[#1F3A5F] hover:text-white disabled:opacity-60"
            >
                {busy ? "Activation..." : "Activer les notifications"}
            </button>
            {state === "error" && (
                <p className="max-w-xs text-right text-xs text-red-600">
                    Erreur : {errorDetail || "impossible d'activer les notifications sur cet appareil."}
                </p>
            )}
        </div>
    );
}
