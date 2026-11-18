import { useCallback, useEffect, useRef, useState } from "react";

// Le navigateur normalise toujours object-position en sa forme longue à deux
// valeurs (ex. "center" -> "center center", "top" -> "center top") quand on
// relit l'attribut style. Comme le pré-rendu capture un DOM déjà passé par ce
// navigateur, on écrit directement cette forme normalisée pour que le premier
// rendu React côté client corresponde exactement au HTML statique.
const OBJECT_POSITION_LONGHAND = {
    center: "center center",
    top: "center top",
    bottom: "center bottom",
    left: "left center",
    right: "right center",
};

export default function BeforeAfterSlider({ before, after, alt, title, objectPosition = "center", aspect = "portrait", fit = "cover", bordered = true, priority = false }) {
    const normalizedObjectPosition = OBJECT_POSITION_LONGHAND[objectPosition] ?? objectPosition;
    const [position, setPosition] = useState(50);
    const containerRef = useRef(null);
    const overlayRef = useRef(null);
    const isDragging = useRef(false);

    const updatePosition = useCallback((clientX) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const clamped = Math.max(0, Math.min(clientX - rect.left, rect.width));
        setPosition((clamped / rect.width) * 100);
    }, []);

    const handlePointerDown = useCallback(
        (e) => {
            e.stopPropagation();
            isDragging.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            updatePosition(e.clientX);
        },
        [updatePosition],
    );

    const handlePointerMove = useCallback(
        (e) => {
            if (!isDragging.current) return;
            e.stopPropagation();
            updatePosition(e.clientX);
        },
        [updatePosition],
    );

    const handlePointerUp = useCallback((e) => {
        e.stopPropagation();
        isDragging.current = false;
    }, []);

    const handleKeyDown = useCallback((e) => {
        if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
        if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 5));
    }, []);

    // Gestion tactile native attachée à un calque transparent dédié
    // (overlayRef), séparé des images. Sur Safari iOS, deux images
    // superposées avec clip-path ont une détection tactile peu fiable
    // au centre ; un calque plein, non découpé, règle le problème.
    useEffect(() => {
        const node = overlayRef.current;
        if (!node) return;

        const onTouchStart = (e) => {
            e.stopPropagation();
            isDragging.current = true;
            if (e.touches[0]) updatePosition(e.touches[0].clientX);
        };

        const onTouchMove = (e) => {
            if (!isDragging.current) return;
            e.preventDefault();
            e.stopPropagation();
            if (e.touches[0]) updatePosition(e.touches[0].clientX);
        };

        const onTouchEnd = (e) => {
            e.stopPropagation();
            isDragging.current = false;
        };

        node.addEventListener("touchstart", onTouchStart, { passive: false });
        node.addEventListener("touchmove", onTouchMove, { passive: false });
        node.addEventListener("touchend", onTouchEnd);
        node.addEventListener("touchcancel", onTouchEnd);

        return () => {
            node.removeEventListener("touchstart", onTouchStart);
            node.removeEventListener("touchmove", onTouchMove);
            node.removeEventListener("touchend", onTouchEnd);
            node.removeEventListener("touchcancel", onTouchEnd);
        };
    }, [updatePosition]);

    const imageStyle = {
        WebkitUserDrag: "none",
        // -webkit-touch-callout n'existe pas dans le moteur Chromium : la
        // valeur y est toujours silencieusement ignorée (donc jamais écrite
        // dans l'attribut style réel), alors que React s'attend quand même à
        // la retrouver lors de l'hydratation, ce qui déclenche une erreur sur
        // Chrome/Chromium à chaque chargement. Seul Safari en tient compte,
        // et son avantage (désactiver le menu contextuel au appui long sur
        // iOS) est mineur ici puisque userSelect/draggable couvrent déjà
        // l'essentiel (empêcher la sélection/le glisser-déposer de l'image).
        WebkitUserSelect: "none",
        userSelect: "none",
        objectPosition: normalizedObjectPosition,
    };

    return (
        <article className={`reveal-card overflow-hidden rounded-[2rem] ${bordered ? "border border-[#93B8D8]" : ""} bg-white shadow-[0_16px_44px_rgba(31,58,95,0.08)] transition-shadow duration-500 hover:shadow-[0_28px_64px_rgba(147,184,216,0.22)]`}>
            {/* ── Slider area ── */}
            <div
                ref={containerRef}
                className={`relative ${aspect === "square" ? "aspect-square" : aspect === "landscape" ? "aspect-[4/3]" : "aspect-[3/4]"} ${fit === "contain" ? "bg-[#0F2444]" : ""} cursor-col-resize select-none overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93B8D8] focus-visible:ring-offset-2`}
                tabIndex={0}
                role="slider"
                aria-label={`Comparaison avant/après — ${title ?? alt}`}
                aria-valuenow={Math.round(position)}
                aria-valuemin={0}
                aria-valuemax={100}
                onKeyDown={handleKeyDown}
            >
                {/* After image — base layer (always fully visible) */}
                <img
                    src={after}
                    alt={`Après — ${alt}`}
                    className={`absolute inset-0 h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
                    style={imageStyle}
                    loading={priority ? "eager" : "lazy"}
                    fetchPriority={priority ? "high" : "auto"}
                    decoding="async"
                    draggable={false}
                />

                {/* Before image — clipped to the left portion via clip-path */}
                <img
                    src={before}
                    alt={`Avant — ${alt}`}
                    className={`absolute inset-0 h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
                    style={{ clipPath: `inset(0px ${100 - position}% 0px 0px)`, ...imageStyle }}
                    loading={priority ? "eager" : "lazy"}
                    fetchPriority={priority ? "high" : "auto"}
                    decoding="async"
                    draggable={false}
                />

                {/* ── Divider (pointer-events-none so drag goes through) ── */}
                <div
                    className="pointer-events-none absolute inset-y-0 z-10"
                    style={{ left: `${position}%`, transform: "translateX(-50%)" }}
                    aria-hidden="true"
                >
                    {/* Vertical line */}
                    <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-white/95 shadow-[0_0_10px_rgba(147,184,216,0.60)]" />

                    {/* Round handle */}
                    <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-[3px] rounded-full border-2 border-[#93B8D8] bg-white shadow-[0_4px_18px_rgba(31,58,95,0.22)]">
                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                            <path
                                d="M5 1L1 6L5 11"
                                stroke="#1F3A5F"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                            <path
                                d="M2 1L6 6L2 11"
                                stroke="#1F3A5F"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>

                {/* ── Labels ── */}
                <span className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    Avant
                </span>
                <span className="pointer-events-none absolute bottom-3 right-3 z-10 rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    Après
                </span>

                {/* ── Overlay transparent : capte tous les gestes, au-dessus de tout ── */}
                <div
                    ref={overlayRef}
                    className="absolute inset-0 z-20 cursor-col-resize"
                    style={{ touchAction: "none", backgroundColor: "transparent" }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                />
            </div>
        </article>
    );
}