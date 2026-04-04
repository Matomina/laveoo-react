import { siteData } from "../data/siteData";

export default function Footer() {
    const { brand, footer, contact } = siteData;
    const footerLinks = footer?.links ?? [];
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-200 bg-[#F5F5F5] py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
                    <div>
                        <p className="text-lg font-semibold text-[#1F3A5F]">
                            {brand?.name ?? "LAVEOO"}
                        </p>

                        <p className="mt-2 text-sm text-[#595959]">
                            {brand?.tagline ?? "Nettoyage intérieur automobile à domicile"}
                        </p>

                        <p className="mt-2 text-sm text-[#595959]">
                            {contact?.serviceArea ?? ""}
                        </p>
                    </div>

                    <nav
                        className="flex flex-wrap items-center justify-center gap-6 text-sm"
                        aria-label="Navigation pied de page"
                    >
                        {footerLinks.map((link) => (
                            <a
                                key={`${link.label}-${link.href}`}
                                href={link.href}
                                className="font-medium text-[#595959] transition hover:text-[#1F3A5F]"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="text-sm text-[#595959]">
                        <p>
                            © {currentYear} {brand?.name ?? "LAVEOO"}
                        </p>

                        <p className="mt-1">
                            {footer?.copyrightLabel ?? "Tous droits réservés"}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}