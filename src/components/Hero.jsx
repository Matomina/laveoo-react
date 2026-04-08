import heroImage from "../assets/hero-laveoo.jpg";
import { siteData } from "../data/siteData";

export default function Hero() {
    const { brand, contact, cta, hero, offer, included } = siteData;

    const primaryCta = cta?.primary ?? {
        label: "Appeler maintenant",
        href: `tel:${contact?.phone ?? ""}`,
    };

    const secondaryCta = cta?.secondary ?? {
        label: "Voir nos services",
        href: "#services",
    };

    return (
        <section
            id="accueil"
            className="relative overflow-hidden bg-[#EAF2FB]"
            aria-labelledby="hero-title"
        >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(234,242,251,1)_0%,rgba(245,245,245,1)_100%)]" />
            <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-white/40 blur-3xl" />
            <div className="absolute -left-20 top-24 h-40 w-40 rounded-full bg-white/30 blur-3xl" />
            <div className="absolute -right-16 bottom-10 h-52 w-52 rounded-full bg-[#1F3A5F]/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="text-center lg:text-left">
                        <div className="reveal-card inline-flex rounded-full border border-white/80 bg-white/85 px-4 py-2 text-sm font-semibold text-[#1F3A5F] shadow-sm backdrop-blur">
                            {hero?.badge ?? "Service professionnel à domicile"}
                        </div>

                        <h1
                            id="hero-title"
                            className="reveal-card mt-6 text-4xl font-black leading-[1.02] tracking-tight text-[#1F3A5F] sm:text-5xl lg:text-6xl"
                        >
                            {hero?.title ?? "Nettoyage voiture à domicile à Yerres"}
                        </h1>

                        <p className="reveal-card mx-auto mt-6 max-w-2xl text-base leading-8 text-[#595959] sm:text-lg lg:mx-0">
                            {hero?.subtitle ??
                                brand?.description ??
                                "Service professionnel de nettoyage intérieur automobile à domicile à Yerres et dans les environs."}
                        </p>

                        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                            <a
                                href={primaryCta.href}
                                className="reveal-card inline-flex min-h-[58px] items-center justify-center rounded-full bg-[#1F3A5F] px-8 py-4 text-center text-base font-semibold text-white shadow-[0_14px_34px_rgba(31,58,95,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(31,58,95,0.24)]"
                                aria-label={`${primaryCta.label} ${brand?.name ?? "LAVEOO"} au ${contact?.phoneDisplay ?? ""}`}
                            >
                                {primaryCta.label}
                            </a>

                            <a
                                href={secondaryCta.href}
                                className="reveal-card inline-flex min-h-[58px] items-center justify-center rounded-full border border-[#1F3A5F]/12 bg-white/90 px-8 py-4 text-center text-base font-semibold text-[#1F3A5F] shadow-[0_10px_24px_rgba(31,58,95,0.08)] backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_34px_rgba(31,58,95,0.12)]"
                            >
                                {secondaryCta.label}
                            </a>
                        </div>

                        <div className="mt-8 flex flex-col gap-3 text-sm text-[#595959] sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
                            {(hero?.highlights ?? []).map((highlight) => (
                                <span
                                    key={highlight}
                                    className="reveal-card rounded-full border border-white/70 bg-white/80 px-4 py-2 text-center font-medium shadow-sm backdrop-blur"
                                >
                                    {highlight}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="reveal-card flex justify-center">
                        <div className="w-full max-w-xl rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-[0_24px_70px_rgba(31,58,95,0.14)] backdrop-blur sm:p-6">
                            <div className="overflow-hidden rounded-[1.5rem]">
                                <img
                                    src={heroImage}
                                    alt={hero?.imageAlt ?? "Nettoyage intérieur automobile à domicile"}
                                    className="h-[260px] w-full object-cover sm:h-[320px] lg:h-[360px]"
                                />
                            </div>

                            <div className="mt-5 grid gap-4">
                                <div
                                    id={offer?.anchorId ?? "offre"}
                                    className="rounded-[1.5rem] bg-[#F8FAFC] p-5 text-center shadow-[0_10px_30px_rgba(31,58,95,0.06)] sm:text-left"
                                >
                                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1F3A5F]">
                                        {offer?.label ?? "Offre actuelle"}
                                    </p>

                                    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                                        <p className="text-4xl font-black text-[#1F3A5F]">
                                            {offer?.price ?? "69€"}
                                        </p>
                                    </div>

                                    <p className="mt-3 text-sm leading-7 text-[#595959]">
                                        {offer?.description ?? ""}
                                    </p>
                                </div>

                                <div className="rounded-[1.5rem] bg-[#EAF2FB] p-5 text-left shadow-[0_10px_30px_rgba(31,58,95,0.06)]">
                                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1F3A5F]">
                                        {included?.title ?? "Ce qui est inclus"}
                                    </p>

                                    <ul className="mt-4 grid gap-2.5 text-sm leading-7 text-[#595959] sm:grid-cols-2">
                                        {(included?.items ?? []).map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-start gap-2.5"
                                            >
                                                <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1F3A5F]" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}