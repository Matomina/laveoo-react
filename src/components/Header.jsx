import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { siteData } from "../data/siteData";

export default function Header() {
    const { brand, contact, navigation } = siteData;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/88">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-3 py-3 sm:gap-4 sm:py-4">
                    <Link to="/" onClick={() => setIsMenuOpen(false)} className="inline-flex shrink-0 items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3A5F]/25" aria-label={`Retour à l’accueil ${brand.name}`}>
                        <img src="/logo-laveoo.png" alt={`Logo ${brand.name}`} width="260" height="82" className="h-[46px] w-auto object-contain transition duration-300 hover:scale-[1.02] sm:h-[54px]" />
                    </Link>

                    <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Navigation principale">
                        {navigation.map((link) => (
                            <NavLink key={link.href} to={link.href} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `premium-link relative text-sm font-semibold transition ${isActive ? "text-[#1769E8]" : "text-slate-700 hover:text-[#1F3A5F]"}`}>
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2.5 sm:gap-3">
                        <a href={`tel:${contact.phone}`} className="premium-button inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[#102A59] px-5 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(31,58,95,0.20)] sm:min-h-[54px] sm:px-6">
                            <span aria-hidden="true">☎</span> Appeler
                        </a>
                        <button type="button" className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-full border border-slate-200 bg-white text-[#1F3A5F] shadow-[0_8px_20px_rgba(15,23,42,0.06)] sm:h-[54px] sm:w-[54px] lg:hidden" aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" onClick={() => setIsMenuOpen((value) => !value)}>
                            <div className="flex flex-col gap-1.5">
                                <span className={`h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
                                <span className={`h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? "opacity-0" : ""}`} />
                                <span className={`h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
                            </div>
                        </button>
                    </div>
                </div>

                <div className={`overflow-hidden transition-all duration-300 ease-out lg:hidden ${isMenuOpen ? "max-h-[560px] border-t border-slate-200 py-4 opacity-100" : "max-h-0 py-0 opacity-0"}`}>
                    <nav id="mobile-navigation" className="flex flex-col gap-2" aria-label="Navigation mobile">
                        {navigation.map((link) => (
                            <NavLink key={link.href} to={link.href} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `rounded-2xl px-4 py-3 text-sm font-semibold transition ${isActive ? "bg-[#EAF2FB] text-[#1769E8]" : "text-slate-700 hover:bg-slate-50"}`}>
                                {link.label}
                            </NavLink>
                        ))}
                        <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="premium-button mt-2 inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-[#1769E8] px-4 py-3 text-sm font-semibold text-white">WhatsApp</a>
                    </nav>
                </div>
            </div>
        </header>
    );
}
