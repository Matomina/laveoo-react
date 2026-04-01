import { siteData } from "../data/siteData";

export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-[#F5F5F5] py-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 text-sm text-[#595959] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                <p>© {new Date().getFullYear()} {siteData.brand} - {siteData.tagline}</p>

                <div className="flex gap-5">
                    <a href="#offre" className="hover:text-[#1F3A5F]">Offre</a>
                    <a href="#services" className="hover:text-[#1F3A5F]">Services</a>
                    <a href="#contact" className="hover:text-[#1F3A5F]">Contact</a>
                </div>
            </div>
        </footer>
    );
}