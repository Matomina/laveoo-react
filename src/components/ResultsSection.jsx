import { useRef, useState } from "react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { siteData } from "../data/siteData";
import { isInCarouselWindow } from "../utils/carouselWindow";

const SWIPE_THRESHOLD = 45;

export default function ResultsSection({ comparisons, columns = 3, title, intro }) {
    const { results } = siteData;
    const displayedComparisons = comparisons ?? results?.comparisons ?? [];
    const [activeIndex, setActiveIndex] = useState(0);
    const swipeStart = useRef(null);

    const goTo = (index) => {
        const count = displayedComparisons.length;
        setActiveIndex(((index % count) + count) % count);
    };

    const handlePointerDown = (e) => {
        swipeStart.current = e.clientX;
    };

    const handlePointerUp = (e) => {
        if (swipeStart.current === null) return;
        const delta = e.clientX - swipeStart.current;
        swipeStart.current = null;
        if (delta > SWIPE_THRESHOLD) goTo(activeIndex - 1);
        else if (delta < -SWIPE_THRESHOLD) goTo(activeIndex + 1);
    };

    const active = displayedComparisons[activeIndex];

    return (
        <section
            id="resultats"
            className="relative overflow-hidden bg-white py-20 lg:py-24"
            aria-labelledby="results-title"
        >
            <div className="absolute left-0 top-10 h-48 w-48 rounded-full bg-[#EAF2FB] blur-3xl" />
            <div className="absolute right-0 bottom-10 h-56 w-56 rounded-full bg-[#1F3A5F]/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="reveal-card mx-auto max-w-3xl text-center">
                    <h2
                        id="results-title"
                        className="text-4xl font-black tracking-tight text-[#1F3A5F] sm:text-5xl"
                    >
                        {title ?? results?.title ?? "Nos résultats"}
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-[#595959]">
                        {intro ?? results?.intro}
                    </p>
                </div>

                {/* ── Mobile : carrousel une photo à la fois, avec effet de glissement ── */}
                {active && (
                    <div className="mt-10 sm:hidden">
                        <div className="relative">
                            <div
                                className="overflow-hidden rounded-[2rem]"
                                onPointerDown={handlePointerDown}
                                onPointerUp={handlePointerUp}
                                onPointerCancel={() => {
                                    swipeStart.current = null;
                                }}
                            >
                                <div className="carousel-track" style={{ transform: `translateX(${-(activeIndex * 100)}%)` }}>
                                    {displayedComparisons.map((comparison, index) => (
                                        <div key={comparison.id} className="carousel-slide">
                                            {isInCarouselWindow(index, activeIndex, displayedComparisons.length) && (
                                                <BeforeAfterSlider
                                                    before={comparison.before}
                                                    after={comparison.after}
                                                    alt={comparison.alt}
                                                    title={comparison.title}
                                                    objectPosition={comparison.objectPosition}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => goTo(activeIndex - 1)}
                                aria-label="Photo précédente"
                                className="absolute left-2 top-[72%] z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#1F3A5F] text-lg font-black text-white shadow-[0_8px_20px_rgba(31,58,95,0.35)]"
                            >
                                ‹
                            </button>

                            <button
                                type="button"
                                onClick={() => goTo(activeIndex + 1)}
                                aria-label="Photo suivante"
                                className="absolute right-2 top-[72%] z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#1F3A5F] text-lg font-black text-white shadow-[0_8px_20px_rgba(31,58,95,0.35)]"
                            >
                                ›
                            </button>
                        </div>

                        <div className="mt-4 flex gap-2.5 overflow-x-auto px-1 pb-1">
                            {displayedComparisons.map((comparison, index) => (
                                <button
                                    key={comparison.id}
                                    type="button"
                                    onClick={() => goTo(index)}
                                    aria-label={`Voir la photo ${index + 1} : ${comparison.title ?? ""}`}
                                    aria-pressed={index === activeIndex}
                                    className={`h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                                        index === activeIndex ? "border-[#1769E8]" : "border-transparent opacity-70"
                                    }`}
                                >
                                    <img
                                        src={comparison.after}
                                        alt=""
                                        aria-hidden="true"
                                        className="h-full w-full object-cover"
                                        style={{ objectPosition: comparison.objectPosition }}
                                        loading="lazy"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Ordinateur / tablette : grille complète ── */}
                <div
                    className={`mt-14 hidden gap-6 sm:grid sm:grid-cols-2 ${columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}
                >
                    {displayedComparisons.map((comparison) => (
                        <BeforeAfterSlider
                            key={comparison.id}
                            before={comparison.before}
                            after={comparison.after}
                            alt={comparison.alt}
                            title={comparison.title}
                            objectPosition={comparison.objectPosition}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
