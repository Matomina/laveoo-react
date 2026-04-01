import { siteData } from "../data/siteData";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <div>
                    <div className="text-2xl font-extrabold tracking-tight text-[#1F3A5F]">
                        {siteData.brand}
                    </div>
                    <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#595959]">
                        {siteData.tagline}
                    </div>
                </div>

                <nav className="hidden gap-8 md:flex">
                    <a href="#offre" className="text-sm font-medium transition hover:text-[#1F3A5F]">
                        Notre offre
                    </a>
                    <a href="#services" className="text-sm font-medium transition hover:text-[#1F3A5F]">
                        Services
                    </a>
                    <a href="#contact" className="text-sm font-medium transition hover:text-[#1F3A5F]">
                        Contact
                    </a>
                </nav>

                <a
                    href={`tel:${siteData.phone}`}
                    className="rounded-full bg-[#1F3A5F] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5"
                >
                    Appeler maintenant
                </a>
            </div>
        </header>
    );
}