import { useState } from "react";
import { siteData } from "../data/siteData";

export default function Header() {
    const { brand, contact, navigation, cta } = siteData;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = navigation ?? [];
    const primaryCta = cta?.primary ?? {
        label: "Appeler maintenant",
        href: `tel:${contact?.phone ?? ""}`,
    };

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/92 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-3 py-3.5 sm:gap-4 sm:py-4 lg:py-5">
                    <div className="min-w-0 shrink-0">
                        <a
                            href="#accueil"
                            className="inline-flex items-center shrink-0"
                            aria-label={`Retour à l'accueil ${brand?.name ?? "LAVEOO"}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <img
                                src="/logo-laveoo.jpg"
                                alt={`Logo ${brand?.name ?? "LAVEOO"}`}
                                width="220"
                                height="70"
                                className="h-11 w-auto max-w-[220px] object-contain transition duration-300 hover:opacity-85 sm:h-12 sm:max-w-[240px] lg:h-14 lg:max-w-[280px]"
                                loading="eager"
                                decoding="async"
                            />
                        </a>
                    </div>

                    <nav
                        className="hidden items-center gap-8 lg:flex"
                        aria-label="Navigation principale"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="relative text-sm font-semibold text-slate-700 transition duration-300 hover:text-[#1F3A5F]"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2.5 sm:gap-3">
                        <a
                            href={primaryCta.href}
                            aria-label={`${primaryCta.label} ${brand?.name ?? "LAVEOO"}`}
                            className="hidden min-h-[54px] items-center justify-center rounded-full bg-[#1F3A5F] px-6 py-3 text-center text-sm font-semibold text-white shadow-[0_14px_36px_rgba(31,58,95,0.20)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#183250] hover:shadow-[0_20px_44px_rgba(31,58,95,0.26)] sm:inline-flex"
                        >
                            {primaryCta.label}
                        </a>

                        <a
                            href={primaryCta.href}
                            aria-label={`${primaryCta.label} ${brand?.name ?? "LAVEOO"}`}
                            className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#1F3A5F] px-4 py-2 text-center text-sm font-semibold text-white shadow-[0_12px_28px_rgba(31,58,95,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#183250] hover:shadow-[0_18px_36px_rgba(31,58,95,0.22)] sm:hidden"
                        >
                            Appeler
                        </a>

                        <button
                            type="button"
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-[#1F3A5F] shadow-[0_8px_20px_rgba(15,23,42,0.06)] transition duration-300 hover:bg-slate-50 hover:shadow-[0_12px_28px_rgba(15,23,42,0.10)] lg:hidden"
                            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-navigation"
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                        >
                            <div className="flex flex-col gap-1.5">
                                <span
                                    className={`h-0.5 w-5 rounded-full bg-current transition duration-300 ${
                                        isMenuOpen ? "translate-y-2 rotate-45" : ""
                                    }`}
                                />
                                <span
                                    className={`h-0.5 w-5 rounded-full bg-current transition duration-300 ${
                                        isMenuOpen ? "opacity-0" : ""
                                    }`}
                                />
                                <span
                                    className={`h-0.5 w-5 rounded-full bg-current transition duration-300 ${
                                        isMenuOpen ? "-translate-y-2 -rotate-45" : ""
                                    }`}
                                />
                            </div>
                        </button>
                    </div>
                </div>

                <div
                    className={`overflow-hidden transition-all duration-300 ease-out lg:hidden ${
                        isMenuOpen
                            ? "max-h-[420px] border-t border-slate-200 py-4 opacity-100"
                            : "max-h-0 py-0 opacity-0"
                    }`}
                >
                    <nav
                        id="mobile-navigation"
                        className="flex flex-col gap-3"
                        aria-label="Navigation mobile"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition duration-300 hover:bg-slate-50 hover:text-[#1F3A5F]"
                            >
                                {link.label}
                            </a>
                        ))}

                        <a
                            href={primaryCta.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="mt-2 inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-[#1F3A5F] px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_14px_30px_rgba(31,58,95,0.18)] transition duration-300 hover:bg-[#16304f]"
                        >
                            {primaryCta.label}
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
}