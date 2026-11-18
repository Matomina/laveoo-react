import { Link } from "react-router-dom";
import { siteData } from "../data/siteData";
import GoogleRatingBadge from "./GoogleRatingBadge";

function CarIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M5 11L6.5 7.5C6.8 6.7 7.6 6.2 8.4 6.2H15.6C16.4 6.2 17.2 6.7 17.5 7.5L19 11H20.5C21.3 11 22 11.7 22 12.5V16C22 16.6 21.6 17 21 17H20C20 18.1 19.1 19 18 19C16.9 19 16 18.1 16 17H8C8 18.1 7.1 19 6 19C4.9 19 4 18.1 4 17H3C2.4 17 2 16.6 2 16V12.5C2 11.7 2.7 11 3.5 11H5Z"
                fill="currentColor"
            />
            <circle cx="6" cy="17" r="2.1" fill="white" />
            <circle cx="6" cy="17" r="1" fill="currentColor" />
            <circle cx="18" cy="17" r="2.1" fill="white" />
            <circle cx="18" cy="17" r="1" fill="currentColor" />
        </svg>
    );
}

function SparkleIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M9.8 15.9 9 18.75l-.8-2.85a4.5 4.5 0 0 0-3.1-3.1L2.25 12l2.85-.8a4.5 4.5 0 0 0 3.1-3.1L9 5.25l.8 2.85a4.5 4.5 0 0 0 3.1 3.1l2.85.8-2.85.8a4.5 4.5 0 0 0-3.1 3.1Z" />
            <path d="M18.26 8.72 18 9.75l-.26-1.03a3.4 3.4 0 0 0-2.46-2.46L14.25 6l1.03-.26a3.4 3.4 0 0 0 2.46-2.46L18 2.25l.26 1.03a3.4 3.4 0 0 0 2.46 2.46L21.75 6l-1.03.26a3.4 3.4 0 0 0-2.46 2.46Z" />
        </svg>
    );
}

function CardIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="2.5" y="5.5" width="19" height="13" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
            <rect x="2.5" y="9" width="19" height="3" fill="currentColor" />
            <rect x="5" y="15" width="5" height="1.6" rx="0.8" fill="currentColor" />
        </svg>
    );
}

const reassurance = [
    { icon: null, label: null, google: true },
    { icon: <CarIcon />, label: "Déplacement inclus" },
    { icon: <SparkleIcon />, label: "Finition haut de gamme" },
    { icon: <CardIcon />, label: "Paiement à la fin de la prestation" },
];

export default function Hero({
    title = siteData.hero.title,
    subtitle = siteData.hero.subtitle,
}) {
    return (
        <section id="accueil" className="relative overflow-hidden bg-[#0F2444]" aria-labelledby="hero-title">
            <img
                src="/vehicle-search-cover-desktop.webp"
                srcSet="/vehicle-search-cover-mobile.webp 640w, /vehicle-search-cover-1120.webp 1120w, /vehicle-search-cover-desktop.webp 1600w"
                sizes="100vw"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
                fetchPriority="high"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,36,68,0.88)_0%,rgba(15,36,68,0.78)_55%,rgba(245,245,245,1)_100%)]" />
            <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
            <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
                <div className="mx-auto max-w-4xl text-center">
                    <p className="reveal-card text-xs font-black uppercase tracking-[0.24em] text-white/70">Nettoyage intérieur automobile</p>
                    <h1 id="hero-title" className="reveal-card mx-auto mt-6 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">{title}</h1>
                    <p className="reveal-card mx-auto mt-7 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">{subtitle}</p>

                    <div className="reveal-card mx-auto mt-12 grid max-w-md grid-cols-2 gap-3 sm:max-w-none sm:grid-cols-4 sm:gap-5 lg:mt-16">
                        {reassurance.map((item) => (
                            <div key={item.label ?? "google"} className="flex items-center justify-center gap-2 rounded-2xl bg-white px-3 py-3 text-xs font-bold text-[#1F3A5F] shadow-[0_8px_20px_rgba(0,0,0,0.15)] sm:text-sm">
                                {item.google ? (
                                    <>
                                        <GoogleRatingBadge iconOnly />
                                        <GoogleRatingBadge textOnly />
                                    </>
                                ) : (
                                    <>
                                        <span className="flex shrink-0 items-center justify-center text-[#1F3A5F]">{item.icon}</span>
                                        <span>{item.label}</span>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="reveal-card mx-auto mt-12 max-w-md lg:mt-16">
                        <Link to="/reservation" className="premium-button flex min-h-[58px] w-full items-center justify-center rounded-full bg-[#1F3A5F] px-8 py-4 text-base font-semibold text-white shadow-[0_14px_34px_rgba(0,0,0,0.25)]">Réserver mon nettoyage</Link>
                        <Link to="/tarifs" className="mt-4 inline-block text-sm font-semibold text-white/70 underline underline-offset-4 hover:text-white">Découvrir les tarifs</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}