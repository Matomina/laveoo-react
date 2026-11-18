import { siteData } from "../data/siteData";
import { Link } from "react-router-dom";

const AnchorTag = "a";

const DEPARTEMENTS_FOOTER = [
    { slug: "essonne", nom: "Essonne (91)" },
    { slug: "val-de-marne", nom: "Val-de-Marne (94)" },
    { slug: "seine-et-marne", nom: "Seine-et-Marne (77)" },
];

// Les plus grandes villes desservies, pour garder un footer lisible plutôt
// que de lister les 50+ villes : la liste complète reste accessible via
// "Nos zones d'intervention".
const VILLES_FOOTER = [
    { slug: "creteil", nom: "Créteil" },
    { slug: "saint-maur-des-fosses", nom: "Saint-Maur-des-Fossés" },
    { slug: "evry-courcouronnes", nom: "Évry-Courcouronnes" },
    { slug: "corbeil-essonnes", nom: "Corbeil-Essonnes" },
    { slug: "alfortville", nom: "Alfortville" },
    { slug: "choisy-le-roi", nom: "Choisy-le-Roi" },
    { slug: "pontault-combault", nom: "Pontault-Combault" },
];

export default function Footer() {
    const { brand, footer, contact, businessHours } = siteData;
    const footerLinks = footer?.links ?? [];
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#1e2840] py-12 sm:py-14 lg:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.7fr_0.7fr_0.8fr] lg:gap-10 lg:items-start">
                    <div className="text-center lg:text-left">
                        <Link
                            to="/"
                            aria-label={`Retour à l'accueil ${brand?.name ?? "LAVEOO"}`}
                            className="inline-flex items-center justify-center lg:justify-start"
                        >
                            <img
                                src="/logo-laveoo-fond-bleu.png"
                                alt={`Logo ${brand?.name ?? "LAVEOO"}`}
                                width="247"
                                height="70"
                                className="h-12 w-auto object-contain transition duration-300 hover:opacity-85 sm:h-14"
                                loading="lazy"
                                decoding="async"
                            />
                        </Link>

                        <p className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-white/70">
                            {brand?.tagline ?? "Nettoyage voiture à domicile"}
                        </p>

                        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/55 lg:mx-0">
                            {brand?.description ??
                                "Service professionnel de nettoyage intérieur automobile à domicile."}
                        </p>
                    </div>

                    <div className="text-center lg:text-left">
                        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-white">
                            Contact
                        </p>

                        <div className="mt-5 space-y-3 text-sm text-white/65">
                            {contact?.phone && (
                                <p>
                                    <AnchorTag
                                        href={`tel:${contact.phone}`}
                                        className="premium-link font-medium transition duration-300 hover:text-white"
                                    >
                                        {contact?.phoneDisplay ?? contact.phone}
                                    </AnchorTag>
                                </p>
                            )}

                            {contact?.email && (
                                <p>
                                    <AnchorTag
                                        href={`mailto:${contact.email}`}
                                        className="premium-link font-medium transition duration-300 hover:text-white"
                                    >
                                        {contact.email}
                                    </AnchorTag>
                                </p>
                            )}

                            {contact?.whatsapp && (
                                <p>
                                    <AnchorTag
                                        href={`https://wa.me/${contact.whatsapp}?text=Bonjour%2C+je+souhaite+r%C3%A9server+un+nettoyage+auto+%C3%A0+domicile.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="premium-link font-medium transition duration-300 hover:text-white"
                                    >
                                        WhatsApp
                                    </AnchorTag>
                                </p>
                            )}

                            {businessHours?.display && <p>{businessHours.display}</p>}
                        </div>
                    </div>

                    <div className="text-center lg:text-left">
                        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-white">
                            Navigation
                        </p>

                        <nav
                            className="mt-5 flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start"
                            aria-label="Navigation pied de page"
                        >
                            {footerLinks.map((link) => (
                                <Link
                                    key={`${link.label}-${link.href}`}
                                    to={link.href}
                                    className="premium-link text-sm font-medium text-white/65 transition duration-300 hover:text-white"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="text-center lg:text-left">
                        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-white">
                            Nos zones d'intervention
                        </p>

                        <nav
                            className="mt-5 flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start"
                            aria-label="Principales villes et départements desservis"
                        >
                            {DEPARTEMENTS_FOOTER.map((departement) => (
                                <Link
                                    key={departement.slug}
                                    to={`/nettoyage-auto-${departement.slug}`}
                                    className="premium-link text-sm font-bold text-white/75 transition duration-300 hover:text-white"
                                >
                                    {departement.nom}
                                </Link>
                            ))}
                            {VILLES_FOOTER.map((ville) => (
                                <Link
                                    key={ville.slug}
                                    to={`/nettoyage-auto/${ville.slug}`}
                                    className="premium-link text-sm font-medium text-white/65 transition duration-300 hover:text-white"
                                >
                                    {ville.nom}
                                </Link>
                            ))}
                            <Link
                                to="/nos-zones-d-intervention"
                                className="premium-link text-sm font-bold text-[#8FB4F2] transition duration-300 hover:text-white"
                            >
                                Voir toutes nos villes →
                            </Link>
                        </nav>
                    </div>
                </div>

                <div className="mt-10 border-t border-white/10 pt-6 sm:mt-12 sm:pt-7">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <p className="text-sm text-white/55">
                            Nettoyage automobile à domicile dans le sud de l’Île-de-France
                        </p>

                        <p className="text-sm text-white/55">
                            {`© ${currentYear} ${brand?.name ?? "LAVEOO"} · ${footer?.copyrightLabel ?? "Tous droits réservés"}`}
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                            <Link
                                to="/mentions-legales"
                                className="premium-link text-sm text-white/55 transition duration-300 hover:text-white"
                            >
                                Mentions légales
                            </Link>
                            <Link
                                to="/politique-de-confidentialite"
                                className="premium-link text-sm text-white/55 transition duration-300 hover:text-white"
                            >
                                Politique de confidentialité
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
