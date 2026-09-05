import { useState } from "react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { siteData } from "../data/siteData";

export default function ResultsSection({ comparisons, columns = 3, title, intro }) {
    const { results } = siteData;
    const displayedComparisons = comparisons ?? results?.comparisons ?? [];
    const [activeIndex, setActiveIndex] = useState(0);

    const goTo = (index) => {
        const count = displayedComparisons.length;
        setActiveIndex(((index % count) + count) % count);
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

                {/* ── Mobile : carrousel une photo à la fois ── */}
                {active && (
                    <div className="mt-10 sm:hidden">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => goTo(activeIndex - 1)}
                                aria-label="Photo précédente"
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#93B8D8]/60 bg-white text-[#1F3A5F] shadow-[0_8px_20px_rgba(31,58,95,0.08)]"
                            >
                                ‹
                            </button>

                            <div className="min-w-0 flex-1">
                                <BeforeAfterSlider
                                    key={active.id}
                                    before={active.before}
                                    after={active.after}
                                    alt={active.alt}
                                    title={active.title}
                                    objectPosition={active.objectPosition}
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() => goTo(activeIndex + 1)}
                                aria-label="Photo suivante"
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#93B8D8]/60 bg-white text-[#1F3A5F] shadow-[0_8px_20px_rgba(31,58,95,0.08)]"
                            >
                                ›
                            </button>
                        </div>

                        <div className="mt-4 flex justify-center gap-2">
                            {displayedComparisons.map((comparison, index) => (
                                <button
                                    key={comparison.id}
                                    type="button"
                                    onClick={() => goTo(index)}
                                    aria-label={`Voir la photo ${index + 1}`}
                                    className={`h-2 rounded-full transition-all ${
                                        index === activeIndex ? "w-6 bg-[#1769E8]" : "w-2 bg-[#93B8D8]/50"
                                    }`}
                                />
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
