import { siteData } from "../data/siteData";

const actionClassByVariant = {
    primary:
        "premium-button bg-[#1F3A5F] text-white shadow-[0_14px_34px_rgba(31,58,95,0.18)] hover:shadow-[0_24px_52px_rgba(31,58,95,0.28)]",
    secondary:
        "premium-button border border-[#1F3A5F]/12 bg-white/90 text-[#1F3A5F] shadow-[0_10px_24px_rgba(31,58,95,0.08)] backdrop-blur hover:bg-white hover:shadow-[0_20px_40px_rgba(31,58,95,0.16)]",
    ghost:
        "premium-button border border-[#1F3A5F]/18 bg-[#EAF2FB] text-[#1F3A5F] shadow-[0_10px_24px_rgba(31,58,95,0.06)] hover:shadow-[0_18px_38px_rgba(31,58,95,0.12)]",
};

export default function Hero() {
    const { hero } = siteData;

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
                <div className="mx-auto max-w-4xl text-center">
                    <div className="reveal-card inline-flex rounded-full border border-white/80 bg-white/85 px-4 py-2 text-sm font-semibold text-[#1F3A5F] shadow-sm backdrop-blur">
                        {hero?.badge ?? "Service professionnel à domicile"}
                    </div>

                    <h1
                        id="hero-title"
                        className="reveal-card mx-auto mt-6 max-w-3xl text-4xl font-black leading-[1.02] tracking-tight text-[#1F3A5F] sm:text-5xl lg:text-6xl"
                    >
                        {hero?.title ?? "Nettoyage automobile à domicile à Yerres"}
                    </h1>

                    <p className="reveal-card mx-auto mt-6 max-w-3xl text-base leading-8 text-[#595959] sm:text-lg">
                        {hero?.subtitle}
                    </p>

                    <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
                        {(hero?.actions ?? []).map((action) => (
                            <a
                                key={action.label}
                                href={action.href}
                                className={`reveal-card inline-flex min-h-[58px] items-center justify-center rounded-full px-8 py-4 text-center text-base font-semibold transition duration-300 ${actionClassByVariant[action.variant] ?? actionClassByVariant.secondary}`}
                            >
                                {action.label}
                            </a>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-col gap-3 text-sm text-[#595959] sm:flex-row sm:flex-wrap sm:justify-center">
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
            </div>
        </section>
    );
}
