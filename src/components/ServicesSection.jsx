import { siteData } from "../data/siteData";

export default function ServicesSection() {
    const servicesBlock = siteData.services ?? {};
    const servicesItems = servicesBlock.items ?? [];
    const includedItems = siteData.included?.items ?? [];

    return (
        <section
            id="services"
            className="bg-[#F5F5F5] py-20 lg:py-24"
            aria-labelledby="services-title"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="reveal-card mx-auto max-w-3xl text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#1F3A5F]">
                        Services
                    </p>

                    <h2
                        id="services-title"
                        className="mt-4 text-4xl font-black tracking-tight text-[#1F3A5F] sm:text-5xl"
                    >
                        {servicesBlock.title ?? "Nos services"}
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-[#595959]">
                        {servicesBlock.intro ?? ""}
                    </p>
                </div>

                <div className="mt-14 grid gap-6 md:grid-cols-2">
                    {servicesItems.map((service) => {
                        const isIncluded = service.id === "ce-qui-est-inclus";

                        return (
                            <article
                                key={service.id}
                                className="reveal-card group h-full rounded-[2rem] border border-white/70 bg-white p-8 text-center shadow-[0_12px_34px_rgba(31,58,95,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(31,58,95,0.14)] md:p-10 md:text-left"
                            >
                                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF2FB] text-3xl shadow-sm transition duration-300 group-hover:scale-105">
                                    {service.icon ?? "•"}
                                </div>

                                <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-[#1F3A5F]/60">
                                    {service.eyebrow ?? "Service"}
                                </p>

                                <h3 className="mt-3 text-3xl font-black leading-tight text-[#1F3A5F]">
                                    {service.title}
                                </h3>

                                {!isIncluded && (
                                    <p className="mt-5 text-base leading-8 text-[#595959]">
                                        {service.description}
                                    </p>
                                )}

                                {isIncluded && (
                                    <div className="mt-6">
                                        <ul className="space-y-3 text-sm leading-7 text-[#595959]">
                                            {includedItems.map((item) => (
                                                <li
                                                    key={item}
                                                    className="flex items-start gap-3 text-left"
                                                >
                                                    <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1F3A5F]" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}