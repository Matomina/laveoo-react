import BeforeAfterSlider from "./BeforeAfterSlider";
import { siteData } from "../data/siteData";

export default function ResultsSection() {
    const { results } = siteData;

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
                        {results?.title ?? "Nos résultats"}
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-[#595959]">
                        {results?.intro}
                    </p>
                </div>

                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {(results?.comparisons ?? []).map((comparison) => (
                        <BeforeAfterSlider
                            key={comparison.id}
                            before={comparison.before}
                            after={comparison.after}
                            alt={comparison.alt}
                            title={comparison.title}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
