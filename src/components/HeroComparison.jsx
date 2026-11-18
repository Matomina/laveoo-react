import { siteData } from "../data/siteData";
import BeforeAfterSlider from "./BeforeAfterSlider";

const heroComparison = siteData.results.comparisons.find((c) => c.id === "comparison-21");

export default function HeroComparison() {
    if (!heroComparison) return null;

    return (
        <section className="bg-white py-10 lg:py-12" aria-labelledby="hero-comparison-title">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <h2 id="hero-comparison-title" className="sr-only">Avant / après un nettoyage intérieur automobile Laveoo</h2>
                <div className="reveal-card mx-auto w-full max-w-xl">
                    <BeforeAfterSlider
                        before={heroComparison.before}
                        after={heroComparison.after}
                        alt={heroComparison.alt}
                        title={heroComparison.title}
                        aspect="square"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
