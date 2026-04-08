import { siteData } from "../data/siteData";

export default function Footer() {
    const { brand, footer, contact, businessHours } = siteData;
    const footerLinks = footer?.links ?? [];
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-200 bg-[#F5F5F5] py-12 sm:py-14 lg:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.9fr] lg:gap-12 lg:items-start">
                    <div className="text-center lg:text-left">
                        <a
                            href="#accueil"
                            aria-label={`Retour à l'accueil ${brand?.name ?? "LAVEOO"}`}
                            className="inline-flex items-center justify-center lg:justify-start"
                        >
                            <img
                                src="/logo-laveoo.svg"
                                alt={`Logo ${brand?.name ?? "LAVEOO"}`}
                                width="180"
                                height="52"
                                className="h-11 w-auto object-contain transition duration-300 hover:opacity-85 sm:h-12"
                                loading="lazy"
                                decoding="async"
                            />
                        </a>

                        <p className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-[#595959]">
                            {brand?.tagline ?? "Nettoyage voiture à domicile"}
                        </p>

                        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#595959] lg:mx-0">
                            {brand?.description ??
                                "Service professionnel de nettoyage intérieur automobile à domicile."}
                        </p>
                    </div>

                    <div className="text-center lg:text-left">
                        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#1F3A5F]">
                            Contact
                        </p>

                        <div className="mt-5 space-y-3 text-sm text-[#595959]">
                            {contact?.serviceArea && <p>{contact.serviceArea}</p>}

                            {contact?.phone && (
                                <p>
                                    <a
                                        href={`tel:${contact.phone}`}
                                        className="font-medium transition duration-300 hover:text-[#1F3A5F]"
                                    >
                                        {contact?.phoneDisplay ?? contact.phone}
                                    </a>
                                </p>
                            )}

                            {contact?.email && (
                                <p>
                                    <a
                                        href={`mailto:${contact.email}`}
                                        className="font-medium transition duration-300 hover:text-[#1F3A5F]"
                                    >
                                        {contact.email}
                                    </a>
                                </p>
                            )}

                            {businessHours?.display && <p>{businessHours.display}</p>}
                        </div>
                    </div>

                    <div className="text-center lg:text-left">
                        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#1F3A5F]">
                            Navigation
                        </p>

                        <nav
                            className="mt-5 flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start"
                            aria-label="Navigation pied de page"
                        >
                            {footerLinks.map((link) => (
                                <a
                                    key={`${link.label}-${link.href}`}
                                    href={link.href}
                                    className="text-sm font-medium text-[#595959] transition duration-300 hover:text-[#1F3A5F]"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>

                <div className="mt-10 border-t border-slate-200 pt-6 sm:mt-12 sm:pt-7">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <p className="text-sm text-[#595959]">
                            Nettoyage voiture à domicile à Yerres et alentours
                        </p>

                        <p className="text-sm text-[#595959]">
                            © {currentYear} {brand?.name ?? "LAVEOO"} ·{" "}
                            {footer?.copyrightLabel ?? "Tous droits réservés"}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}