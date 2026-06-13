import { siteData } from "../data/siteData";

export default function ResultsSection() {
    const { results } = siteData;
    const groupedResults = [];

    for (let index = 0; index < (results?.items?.length ?? 0); index += 2) {
        groupedResults.push(results.items.slice(index, index + 2));
    }

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
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#1F3A5F]">
                        Résultats
                    </p>

                    <h2
                        id="results-title"
                        className="mt-4 text-4xl font-black tracking-tight text-[#1F3A5F] sm:text-5xl"
                    >
                        {results?.title ?? "Nos résultats"}
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-[#595959]">
                        {results?.intro}
                    </p>
                </div>

                <div className="mt-14 grid gap-6 lg:grid-cols-3">
                    {groupedResults.map((column, columnIndex) => (
                        <div key={`result-column-${columnIndex + 1}`} className="grid gap-6">
                            {column.map((item) => (
                                <article
                                    key={item.id}
                                    className={`reveal-card premium-card group rounded-[2rem] border border-dashed p-6 shadow-[0_16px_44px_rgba(31,58,95,0.08)] ${
                                        item.featured
                                            ? "border-[#1F3A5F]/20 bg-[#EAF2FB]"
                                            : "border-slate-200 bg-[#F8FAFC]"
                                    }`}
                                >
                                    <div className="overflow-hidden rounded-[1.5rem] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.9)_0%,rgba(234,242,251,0.9)_100%)] transition duration-500 group-hover:border-[#1F3A5F]/15 group-hover:bg-[linear-gradient(135deg,rgba(255,255,255,1)_0%,rgba(223,236,249,0.95)_100%)]">
                                        <img
                                            src={item.imageSrc}
                                            alt={item.imageAlt ?? item.label}
                                            className="premium-media aspect-[4/3] w-full object-cover"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>

                                    <div className="mt-4 flex items-center justify-between gap-3">
                                        <span className="rounded-full border border-[#1F3A5F]/12 bg-white px-4 py-2 text-sm font-semibold text-[#1F3A5F] shadow-sm">
                                            {item.label}
                                        </span>

                                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1F3A5F]/55">
                                            {item.variant === "before" ? "Avant" : "Après"}
                                        </span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
