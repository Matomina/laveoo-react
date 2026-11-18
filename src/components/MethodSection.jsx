import { useEffect, useRef, useState } from "react";
import { siteData } from "../data/siteData";
import renderWithLinks from "../utils/renderWithLinks";

const CLIPS = [
    { src: "/video-tache-sieges.mp4", poster: "/video-tache-sieges-poster.jpg", label: "Détachage de sièges en action" },
    { src: "/videos/methode-arriere-chr.mp4", poster: "/videos/methode-arriere-chr-poster.jpg", label: "Nettoyage de l'arrière du véhicule" },
];

export const ETAPES = [
    {
        titre: "Vider le véhicule",
        texte: "Nous retirons à la main tout ce qui peut l'être : objets personnels, détritus, affaires laissées dans les portières et les rangements, avant de commencer le nettoyage à proprement parler.",
    },
    {
        titre: "Retrait des tapis",
        texte: "Les tapis sont sortis du véhicule pour être traités à part, ce qui permet d'accéder directement à la moquette en dessous.",
    },
    {
        titre: "Air comprimé et aspiration",
        texte: "Un gros coup d'air comprimé redresse les fibres de la moquette et des sièges et fait remonter en surface les miettes, le sable et la poussière incrustés, aspirés dans la foulée.",
    },
    {
        titre: "Shampoing des sièges et brossage du cuir",
        texte: "Les sièges en tissu sont shampouinés en profondeur ; s'il y a du cuir, il est brossé avec un produit à pH neutre, pour ne pas l'assécher ni l'abîmer dans la durée.",
    },
    {
        titre: "Nettoyage des plastiques",
        texte: "Tous les plastiques sont nettoyés avec un produit spécifique aux plastiques sensibles et au vinyle, jusque dans le détail : poignées de porte, commodos, molettes et interstices.",
    },
    {
        titre: "Vitres",
        texte: "Les vitres intérieures sont nettoyées pour retirer traces et voile, sans laisser de résidus.",
    },
    {
        titre: "Dressing plastique et cuir",
        texte: "Un dressing redonne aux plastiques leur couleur mate d'origine, et un second, spécifique au cuir, restaure sa souplesse sans effet gras ni brillance artificielle.",
    },
    {
        titre: "Aspiration finale et destructeur d'odeurs",
        texte: "Un dernier coup d'aspirateur rapide précède la vaporisation de notre destructeur d'odeurs, qui neutralise les mauvaises odeurs à la source plutôt que de simplement les masquer.",
    },
];

function MethodClip({ clip, index, videoRefs, onStartPlaying }) {
    const [shouldLoad, setShouldLoad] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isOwnVisible, setIsOwnVisible] = useState(false);
    const wrapperRef = useRef(null);

    // Charge la vidéo dès qu'elle approche de l'écran, et suit sa propre
    // visibilité indépendamment de l'autre clip.
    useEffect(() => {
        if (typeof window !== "undefined" && window.__PRERENDER__) return;
        const node = wrapperRef.current;
        if (!node) return;
        const loadObserver = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setShouldLoad(true);
                    loadObserver.disconnect();
                }
            },
            { rootMargin: "200px" }
        );
        loadObserver.observe(node);

        const visibilityObserver = new IntersectionObserver(
            (entries) => setIsOwnVisible(entries[0]?.isIntersecting ?? false),
            { threshold: 0.4 }
        );
        visibilityObserver.observe(node);

        return () => {
            loadObserver.disconnect();
            visibilityObserver.disconnect();
        };
    }, []);

    // Joue dès que ce clip précis est visible, peu importe l'état de l'autre.
    useEffect(() => {
        const node = videoRefs.current[index];
        if (!node || !shouldLoad) return;
        if (isOwnVisible) {
            node.play().catch(() => {});
        } else {
            node.pause();
            node.currentTime = 0;
        }
    }, [isOwnVisible, shouldLoad, index, videoRefs]);

    const handleManualPlay = () => {
        const node = videoRefs.current[index];
        node?.play().catch(() => {});
    };

    return (
        <div ref={wrapperRef} className="relative h-full w-full bg-[#0F2444]">
            {shouldLoad && (
                <video
                    ref={(el) => {
                        videoRefs.current[index] = el;
                    }}
                    className="h-full w-full object-cover"
                    style={{ aspectRatio: "9/16" }}
                    poster={clip.poster}
                    muted
                    loop
                    playsInline
                    preload="none"
                    onPlaying={() => {
                        setIsPlaying(true);
                        onStartPlaying(index);
                    }}
                    onPause={() => setIsPlaying(false)}
                >
                    <source src={clip.src} type="video/mp4" />
                </video>
            )}
            {shouldLoad && isOwnVisible && !isPlaying && (
                <button
                    type="button"
                    onClick={handleManualPlay}
                    aria-label="Lancer la vidéo"
                    className="absolute inset-0 flex items-center justify-center bg-black/20"
                >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg">
                        <svg viewBox="0 0 24 24" fill="#1F3A5F" className="ml-1 h-6 w-6">
                            <polygon points="6 4 20 12 6 20" />
                        </svg>
                    </span>
                </button>
            )}
        </div>
    );
}

function MethodVideos() {
    const videoRefs = useRef([]);

    // Dès qu'un clip démarre, on coupe l'autre pour ne jamais les faire
    // jouer en même temps, sans bloquer celui qui veut se lancer.
    const handleStartPlaying = (index) => {
        videoRefs.current.forEach((node, i) => {
            if (i !== index && node && !node.paused) node.pause();
        });
    };

    return (
        <div className="mx-auto mt-10 grid max-w-xl gap-6 sm:max-w-none sm:grid-cols-2">
            {CLIPS.map((clip, index) => (
                <div key={clip.src} className="reveal-card mx-auto w-[85%] max-w-xs sm:w-full">
                    <div className="overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(31,58,95,0.15)]">
                        <MethodClip clip={clip} index={index} videoRefs={videoRefs} onStartPlaying={handleStartPlaying} />
                    </div>
                    <p className="mt-3 text-center text-sm font-semibold text-[#1F3A5F]">{clip.label}</p>
                </div>
            ))}
        </div>
    );
}

export default function MethodSection() {
    const { method } = siteData;
    const items = method?.items ?? [];

    if (!method) return null;

    return (
        <section id={method.anchorId ?? "methodes"} className="bg-[#F5F5F5] py-16 sm:py-20 lg:py-24" aria-labelledby="method-title">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 id="method-title" className="text-3xl font-black tracking-tight text-[#1F3A5F] sm:text-4xl lg:text-5xl">
                        {method.title ?? "Nos méthodes de nettoyage"}
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#595959] sm:text-lg">
                        {method.intro}
                    </p>
                </div>

                <MethodVideos />

                <div className="mx-auto mt-14 max-w-3xl">
                    <h3 className="reveal-card text-center text-2xl font-black text-[#1F3A5F] sm:text-3xl">Notre protocole, étape par étape</h3>
                    <p className="reveal-card mt-3 text-center leading-7 text-[#595959]">L'ordre des étapes compte autant que les produits utilisés : chaque passage prépare le suivant.</p>
                    <ol className="mt-8 space-y-4">
                        {ETAPES.map((etape, index) => (
                            <li key={etape.titre} className="reveal-card flex gap-4 rounded-2xl bg-white p-5">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1F3A5F] text-sm font-black text-white">
                                    {index + 1}
                                </span>
                                <div>
                                    <p className="font-bold text-[#1F3A5F]">{etape.titre}</p>
                                    <p className="mt-1 leading-7 text-[#595959]">{etape.texte}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="mx-auto mt-14 max-w-3xl space-y-4">
                    {items.map((item, index) => (
                        <p key={item.title} className="reveal-card leading-8 text-[#595959]">
                            <strong className="text-[#1F3A5F]">{item.title}</strong>{" — "}
                            {renderWithLinks(item.description, `method-item-${index}`)}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    );
}
