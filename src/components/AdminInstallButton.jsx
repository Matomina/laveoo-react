import { useEffect, useState } from "react";

function isIos() {
    return /iphone|ipad|ipod/i.test(window.navigator.userAgent) && !window.MSStream;
}

function isStandalone() {
    return (
        window.matchMedia?.("(display-mode: standalone)").matches ||
        window.navigator.standalone === true
    );
}

export default function AdminInstallButton() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [installed, setInstalled] = useState(isStandalone());
    const [showIosGuide, setShowIosGuide] = useState(false);

    useEffect(() => {
        // Manifeste et service worker dédiés à /admin, actifs seulement ici.
        const link = document.createElement("link");
        link.rel = "manifest";
        link.href = "/admin-manifest.webmanifest";
        document.head.appendChild(link);

        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/admin-sw.js", { scope: "/admin/" }).catch(() => {});
        }

        const onBeforeInstall = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };
        const onInstalled = () => setInstalled(true);

        window.addEventListener("beforeinstallprompt", onBeforeInstall);
        window.addEventListener("appinstalled", onInstalled);

        return () => {
            window.removeEventListener("beforeinstallprompt", onBeforeInstall);
            window.removeEventListener("appinstalled", onInstalled);
            document.head.removeChild(link);
        };
    }, []);

    if (installed) return null;

    const handleClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === "accepted") setInstalled(true);
            setDeferredPrompt(null);
            return;
        }
        if (isIos()) {
            setShowIosGuide(true);
            return;
        }
        setShowIosGuide(true);
    };

    return (
        <>
            <button
                type="button"
                onClick={handleClick}
                className="rounded-full bg-[#1F3A5F] px-4 py-2 text-sm font-bold text-white hover:bg-[#102A59]"
            >
                Installer l'application
            </button>

            {showIosGuide && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4" onClick={() => setShowIosGuide(false)}>
                    <div className="max-w-sm rounded-[1.5rem] bg-white p-6 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-lg font-black text-[#1F3A5F]">Installer l'espace admin</h2>
                        <p className="mt-3 text-sm leading-6 text-[#595959]">
                            Sur iPhone : appuyez sur le bouton <strong>Partager</strong> <span aria-hidden="true">📤</span> de Safari, puis choisissez <strong>« Sur l'écran d'accueil »</strong>.
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[#595959]">
                            Sur Android/ordinateur : si le bouton ne propose rien, ouvrez le menu de votre navigateur (⋮) et choisissez <strong>« Installer l'application »</strong>.
                        </p>
                        <button
                            type="button"
                            onClick={() => setShowIosGuide(false)}
                            className="mt-5 inline-flex min-h-10 items-center justify-center rounded-full bg-[#1F3A5F] px-5 py-2 text-sm font-bold text-white"
                        >
                            Compris
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
