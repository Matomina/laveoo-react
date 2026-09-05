import { Link } from "react-router-dom";
import { siteData } from "../data/siteData";

export default function Hero({
    title = siteData.hero.title,
    subtitle = siteData.hero.subtitle,
    actions = siteData.hero.actions,
    highlights = siteData.hero.highlights,
}) {
    return (
        <section id="accueil" className="relative overflow-hidden bg-[#0F2444]" aria-labelledby="hero-title">
            <img
                src="/vehicle-search-cover.webp"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,36,68,0.88)_0%,rgba(15,36,68,0.78)_55%,rgba(245,245,245,1)_100%)]" />
            <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
            <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                <div className="mx-auto max-w-4xl text-center">
                    <p className="reveal-card text-xs font-black uppercase tracking-[0.24em] text-white/70">Nettoyage intérieur automobile</p>
                    <h1 id="hero-title" className="reveal-card mx-auto mt-5 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">{title}</h1>
                    <p className="reveal-card mx-auto mt-6 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">{subtitle}</p>
                    <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        {actions.map((action) => (
                            <Link key={action.label} to={action.href} className={`reveal-card premium-button inline-flex min-h-[58px] items-center justify-center rounded-full px-8 py-4 text-base font-semibold ${action.variant === "primary" ? "bg-white text-[#1F3A5F] shadow-[0_14px_34px_rgba(0,0,0,0.25)]" : "border border-white/40 bg-white/10 text-white backdrop-blur-sm"}`}>{action.label}</Link>
                        ))}
                    </div>
                    <div className="mt-8 flex flex-col gap-3 text-sm text-white sm:flex-row sm:flex-wrap sm:justify-center">
                        {highlights.map((highlight) => <span key={highlight} className="reveal-card rounded-full border border-white/25 bg-white/10 px-4 py-2 font-medium backdrop-blur-sm">✓ {highlight}</span>)}
                    </div>
                </div>
            </div>
        </section>
    );
}