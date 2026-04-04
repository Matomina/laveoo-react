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
        <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-4 py-4 lg:py-5">
                    <div className="min-w-0">
                        <a
                            href="#accueil"
                            className="block text-2xl font-black leading-none tracking-tight text-[#1F3A5F] sm:text-3xl"
                            aria-label={`Retour à l'accueil ${brand?.name ?? "LAVEOO"}`}
                        >
                            {brand?.name ?? "LAVEOO"}
                        </a>

                        <p className="mt-2 max-w-[230px] text-[11px] font-medium uppercase leading-[1.35] tracking-[0.22em] text-[#595959] sm:max-w-none sm:text-xs">
                            {brand?.tagline ?? ""}
                        </p>
                    </div>

                    <nav
                        className="hidden items-center gap-8 lg:flex"
                        aria-label="Navigation principale"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm font-semibold text-slate-700 transition duration-300 hover:text-[#1F3A5F]"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <a
                            href={primaryCta.href}
                            aria-label={`${primaryCta.label} ${brand?.name ?? "LAVEOO"}`}
                            className="inline-flex min-h-[54px] items-center justify-center rounded-full bg-[#1F3A5F] px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_14px_36px_rgba(31,58,95,0.20)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(31,58,95,0.26)] sm:px-6"
                        >
                            {primaryCta.label}
                        </a>

                        <button
                            type="button"
                            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-[#1F3A5F] shadow-sm transition hover:bg-slate-50 lg:hidden"
                            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                            aria-expanded={isMenuOpen}
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                        >
                            <div className="flex flex-col gap-1.5">
                                <span className="h-0.5 w-5 rounded-full bg-current" />
                                <span className="h-0.5 w-5 rounded-full bg-current" />
                                <span className="h-0.5 w-5 rounded-full bg-current" />
                            </div>
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="border-t border-slate-200 py-4 lg:hidden">
                        <nav className="flex flex-col gap-3" aria-label="Navigation mobile">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-[#1F3A5F]"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}