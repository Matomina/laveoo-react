import { siteData } from "../data/siteData";

const serviceAreaIntro =
    "Des prestations pensées pour offrir un nettoyage intérieur complet, professionnel et pratique directement à domicile dans le sud de l’Île-de-France, autour de Yerres.";

const serviceAreaCard = {
    title: "Intervention dans le sud de l’Île-de-France",
    description:
        "LAVEOO se déplace autour de Yerres et dans le sud de l’Île-de-France pour réaliser votre nettoyage intérieur automobile à domicile, selon votre commune et les disponibilités.",
};

export default function ServicesSection() {
    const servicesBlock = siteData.services ?? {};
    const servicesItems = servicesBlock.items ?? [];

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
                        {serviceAreaIntro}
                    </p>
                </div>

                <div className="mt-14 grid gap-6 md:grid-cols-2">
                    {servicesItems.map((service) => {
                        const displayedService =
                            service.id === "zone-intervention"
                                ? { ...service, ...serviceAreaCard }
                                : service;

                        return (
                            <article
                                key={displayedService.id}
                                className="reveal-card group h-full rounded-[2rem] border border-white/70 bg-white p-8 text-center shadow-[0_12px_34px_rgba(31,58,95,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(31,58,95,0.14)] md:p-10 md:text-left"
                            >
                                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF2FB] text-3xl shadow-sm transition duration-300 group-hover:scale-105">
                                    {displayedService.icon ?? "•"}
                                </div>

                                <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-[#1F3A5F]/60">
                                    {displayedService.eyebrow ?? "Service"}
                                </p>

                                <h3 className="mt-3 text-3xl font-black leading-tight text-[#1F3A5F]">
                                    {displayedService.title}
                                </h3>

                                <p className="mt-5 text-base leading-8 text-[#595959]">
                                    {displayedService.description}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
