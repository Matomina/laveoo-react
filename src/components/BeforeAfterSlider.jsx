import { useCallback, useRef, useState } from "react";

export default function BeforeAfterSlider({ before, after, alt, title }) {
    const [position, setPosition] = useState(50);
    const containerRef = useRef(null);
    const isDragging = useRef(false);

    const updatePosition = useCallback((clientX) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const clamped = Math.max(0, Math.min(clientX - rect.left, rect.width));
        setPosition((clamped / rect.width) * 100);
    }, []);

    const handlePointerDown = useCallback(
        (e) => {
            isDragging.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            updatePosition(e.clientX);
        },
        [updatePosition],
    );

    const handlePointerMove = useCallback(
        (e) => {
            if (!isDragging.current) return;
            updatePosition(e.clientX);
        },
        [updatePosition],
    );

    const handlePointerUp = useCallback(() => {
        isDragging.current = false;
    }, []);

    const handleKeyDown = useCallback((e) => {
        if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
        if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 5));
    }, []);

    return (
        <article className="reveal-card overflow-hidden rounded-[2rem] border border-[#93B8D8] bg-white shadow-[0_16px_44px_rgba(31,58,95,0.08)] transition-shadow duration-500 hover:shadow-[0_28px_64px_rgba(147,184,216,0.22)]">
            {/* ── Slider area ── */}
            <div
                ref={containerRef}
                className="relative aspect-[4/3] cursor-col-resize select-none overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93B8D8] focus-visible:ring-offset-2"
                style={{ touchAction: "none" }}
                tabIndex={0}
                role="slider"
                aria-label={`Comparaison avant/après — ${title ?? alt}`}
                aria-valuenow={Math.round(position)}
                aria-valuemin={0}
                aria-valuemax={100}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                onKeyDown={handleKeyDown}
            >
                {/* After image — base layer (always fully visible) */}
                <img
                    src={after}
                    alt={`Après — ${alt}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                />

                {/* Before image — clipped to the left portion via clip-path */}
                <img
                    src={before}
                    alt={`Avant — ${alt}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
                    loading="lazy"
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
            </div>

            {/* ── Footer: title + hint ── */}
            <div className="flex items-center justify-between px-5 py-3.5">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#1F3A5F]">
                    {title}
                </p>
                <p className="text-xs text-[#595959]/55">Glissez pour comparer</p>
            </div>
        </article>
    );
}
