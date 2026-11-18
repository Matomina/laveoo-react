import { useEffect, useRef, useState } from "react";

// La vidéo n'est chargée (et jouée) que lorsqu'elle entre réellement dans
// l'écran — jamais au chargement de la page — pour ne pas pénaliser la
// vitesse du site. Muette + en boucle : pas de son, pas de bouton "play"
// nécessaire, autorisé par tous les navigateurs sans interaction préalable.
export default function LazyVideo({ src, poster, aspect = "9/16", className = "" }) {
    const videoRef = useRef(null);
    const [shouldLoad, setShouldLoad] = useState(false);
    const [muted, setMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleSound = () => {
        setMuted((current) => !current);
    };

    useEffect(() => {
        if (typeof window !== "undefined" && window.__PRERENDER__) return;

        const node = videoRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    // React ne fiabilise ni l'attribut "muted" (bug connu : la propriété DOM
    // réelle peut rester désynchronisée du JSX sur un <video>) ni le
    // chargement/lecture déclenchés après le montage initial (peu fiable sur
    // mobile via les attributs seuls) — tout est imposé ici directement sur
    // l'élément, dans l'ordre exact attendu par les navigateurs : muted
    // AVANT src, puis load(), puis play().
    useEffect(() => {
        if (videoRef.current) videoRef.current.muted = muted;
    }, [muted]);

    useEffect(() => {
        const node = videoRef.current;
        if (!shouldLoad || !node) return;

        let cleanup = () => {};
        let hasPlayedOnce = false;

        const onPlaying = () => {
            setIsPlaying(true);
            if (!hasPlayedOnce) {
                // Dès le premier vrai démarrage, on retire les écouteurs de
                // relance (scroll, clic...) : sinon ils continuent à rappeler
                // play() indéfiniment, y compris après une mise en pause
                // volontaire (ex. vidéo qui sort de l'écran).
                hasPlayedOnce = true;
                cleanup();
            }
        };
        const onPause = () => setIsPlaying(false);
        node.addEventListener("playing", onPlaying);
        node.addEventListener("pause", onPause);

        const tryPlay = () => {
            node.play().catch(() => {
                // Ignoré : une des autres tentatives ci-dessous finira par
                // réussir, sinon le bouton "lecture" reste visible.
            });
        };

        node.muted = muted;
        node.src = src;
        node.load();

        // Plusieurs déclencheurs en parallèle, car la cause exacte d'un échec
        // varie selon le navigateur : vidéo pas encore prête (canplay),
        // retour sur la page (pageshow, après une navigation SPA), ou
        // restriction Safari iOS exigeant une vraie interaction. Si aucun ne
        // fonctionne, le bouton "lecture" affiché reste une solution de
        // secours garantie.
        const gestureEvents = ["touchstart", "click", "scroll"];
        const mediaEvents = ["canplay", "loadeddata"];

        mediaEvents.forEach((event) => node.addEventListener(event, tryPlay));
        gestureEvents.forEach((event) => document.addEventListener(event, tryPlay, { passive: true }));
        window.addEventListener("pageshow", tryPlay);
        const retryTimer = setTimeout(tryPlay, 500);

        cleanup = () => {
            mediaEvents.forEach((event) => node.removeEventListener(event, tryPlay));
            gestureEvents.forEach((event) => document.removeEventListener(event, tryPlay));
            window.removeEventListener("pageshow", tryPlay);
            clearTimeout(retryTimer);
        };

        tryPlay();

        return () => {
            cleanup();
            node.removeEventListener("playing", onPlaying);
            node.removeEventListener("pause", onPause);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldLoad]);

    // Une fois lancée, on coupe la vidéo dès qu'elle sort de l'écran (et elle
    // reprend automatiquement si l'utilisateur remonte vers elle), pour ne
    // pas la laisser jouer en arrière-plan pendant que la page défile.
    useEffect(() => {
        const node = videoRef.current;
        if (!shouldLoad || !node) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    node.play().catch(() => {});
                } else {
                    node.pause();
                }
            },
            { threshold: 0.25 },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [shouldLoad]);

    const handleManualPlay = () => {
        const node = videoRef.current;
        if (!node) return;
        node.muted = muted;
        node.play().catch(() => {});
    };

    return (
        <div className="relative h-full w-full">
            <video
                ref={videoRef}
                className={`h-full w-full object-cover ${className}`}
                style={{ aspectRatio: aspect }}
                poster={poster}
                muted={muted}
                loop
                playsInline
                preload="none"
            />
            {shouldLoad && !isPlaying && (
                <button
                    type="button"
                    onClick={handleManualPlay}
                    aria-label="Lancer la vidéo"
                    className="absolute inset-0 flex items-center justify-center bg-black/20"
                >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
                        <svg viewBox="0 0 24 24" fill="#1F3A5F" className="ml-1 h-7 w-7">
                            <polygon points="6 4 20 12 6 20" />
                        </svg>
                    </span>
                </button>
            )}
            {shouldLoad && (
                <button
                    type="button"
                    onClick={toggleSound}
                    aria-label={muted ? "Activer le son" : "Couper le son"}
                    className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
                >
                    {muted ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <line x1="23" y1="9" x2="17" y2="15" />
                            <line x1="17" y1="9" x2="23" y2="15" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                        </svg>
                    )}
                </button>
            )}
        </div>
    );
}
