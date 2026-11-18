import { useRef, useState } from "react";
import { googleReviews } from "../data/reviews";
import GoogleRatingBadge from "./GoogleRatingBadge";
import { isInCarouselWindow } from "../utils/carouselWindow";

const SWIPE_THRESHOLD = 45;

function ReviewCard({ review }) {
    return (
        <article className="reveal-card premium-card flex h-full flex-col rounded-[1.75rem] border border-[#93B8D8]/55 bg-white p-6 shadow-[0_14px_40px_rgba(31,58,95,0.07)]">
            <span aria-hidden="true" className="text-amber-400">★★★★★</span>
            <p className="mt-3 flex-1 text-sm leading-7 text-[#595959]">{review.text}</p>
            <p className="mt-4 font-black text-[#1F3A5F]">{review.name}</p>
        </article>
    );
}

export default function GoogleReviewsSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const swipeStart = useRef(null);
    const count = googleReviews.length;

    const goTo = (index) => setActiveIndex(((index % count) + count) % count);

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

    return (
        <section className="bg-[#F5F5F5] py-20 lg:py-24" aria-labelledby="google-reviews-title">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="reveal-card mx-auto max-w-2xl text-center">
                    <h2 id="google-reviews-title" className="text-4xl font-black tracking-tight text-[#1F3A5F] sm:text-5xl">
                        Ce que disent nos clients
                    </h2>
                    <div className="mt-5 flex justify-center">
                        <GoogleRatingBadge className="rounded-full bg-white px-5 py-2.5 text-base text-[#1F3A5F] shadow-[0_12px_30px_rgba(31,58,95,0.08)]" />
                    </div>
                </div>

                {/* ── Mobile : carrousel une carte à la fois, avec effet de glissement ── */}
                <div className="mt-12 sm:hidden">
                    <div className="relative">
                        <div
                            className="overflow-hidden"
                            onPointerDown={handlePointerDown}
                            onPointerUp={handlePointerUp}
                            onPointerCancel={() => {
                                swipeStart.current = null;
                            }}
                        >
                            <div className="carousel-track" style={{ transform: `translateX(${-(activeIndex * 100)}%)` }}>
                                {googleReviews.map((review, index) => (
                                    <div key={review.name} className="carousel-slide px-0.5">
                                        {isInCarouselWindow(index, activeIndex, count) && <ReviewCard review={review} />}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => goTo(activeIndex - 1)}
                            aria-label="Avis précédent"
                            className="absolute left-0 top-1/2 z-30 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#1F3A5F] text-lg font-black text-white shadow-[0_8px_20px_rgba(31,58,95,0.35)]"
                        >
                            ‹
                        </button>

                        <button
                            type="button"
                            onClick={() => goTo(activeIndex + 1)}
                            aria-label="Avis suivant"
                            className="absolute right-0 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-[#1F3A5F] text-lg font-black text-white shadow-[0_8px_20px_rgba(31,58,95,0.35)]"
                        >
                            ›
                        </button>
                    </div>

                    <div className="mt-5 flex justify-center gap-2">
                        {googleReviews.map((review, index) => (
                            <button
                                key={review.name}
                                type="button"
                                onClick={() => goTo(index)}
                                aria-label={`Voir l'avis ${index + 1}`}
                                className={`h-2 rounded-full transition-all ${
                                    index === activeIndex ? "w-6 bg-[#1769E8]" : "w-2 bg-[#93B8D8]/50"
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* ── Tablette / ordinateur : grille complète ── */}
                <div className="mt-12 hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
                    {googleReviews.map((review) => (
                        <ReviewCard key={review.name} review={review} />
                    ))}
                </div>
            </div>
        </section>
    );
}
