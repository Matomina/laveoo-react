import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import VideoSection from "../components/VideoSection";
import SectionCta from "../components/SectionCta";
import Breadcrumbs from "../components/Breadcrumbs";
import { companyInfo } from "../data/companyInfo";
import { guidesTaches } from "../data/guidesTaches";

const faqGenerale = [
    {
        question: "Le nettoyage des sièges est-il inclus dans vos forfaits ?",
        reponse: "Oui, le nettoyage des sièges fait partie intégrante de nos forfaits de nettoyage intérieur complet, à partir de 79 € pour une citadine, 99 € pour une compacte/berline/SUV compact, et 119 € pour un grand SUV, monospace ou break. Ce n'est jamais un supplément séparé.",
    },
    {
        question: "Pouvez-vous nettoyer des sièges en cuir sans les abîmer ?",
        reponse: "Oui, nous utilisons des produits spécifiques au cuir (différents de ceux utilisés pour le tissu ou l'Alcantara) qui nettoient en profondeur sans agresser le revêtement ni le dessécher.",
    },
    {
        question: "Combien de temps faut-il pour que les sièges sèchent après l'intervention ?",
        reponse: "En général entre 1 et 3 heures selon le revêtement et la météo, grâce à notre matériel d'extraction qui limite fortement l'humidité résiduelle comparé à un nettoyage fait à la main.",
    },
    {
        question: "Intervenez-vous aussi sur des sièges de voiture très abîmés ?",
        reponse: "Oui, nous évaluons l'état des sièges avant l'intervention et adaptons notre méthode. Certaines taches très anciennes ou incrustées peuvent nécessiter un traitement plus poussé, que nous vous expliquons avant de commencer.",
    },
];

export default function NettoyageSiegesPage() {
    const path = "/nettoyage-sieges-voiture";
    const title = "Nettoyage des sièges de voiture";
    const description = "Nettoyage professionnel des sièges de voiture à domicile par Laveoo : tissu, cuir, cuir perforé, Alcantara. Taches, odeurs, poils d'animaux. Inclus dans nos forfaits dès 79 €.";

    const breadcrumbItems = [
        { name: "Accueil", to: "/" },
        { name: title, to: path },
    ].map((item) => ({ ...item, url: `https://www.laveoo.com${item.to === "/" ? "/" : item.to}` }));

    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbItems.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.name,
                item: item.url,
            })),
        },
        {
            "@context": "https://schema.org",
            "@type": "Service",
            name: title,
            serviceType: title,
            description,
            url: `https://www.laveoo.com${path}`,
            provider: {
                "@type": "AutoWash",
                name: companyInfo.name,
                telephone: companyInfo.phoneDisplay,
                address: { "@type": "PostalAddress", streetAddress: companyInfo.streetAddress, addressLocality: companyInfo.addressLocality, postalCode: companyInfo.postalCode, addressCountry: "FR" },
            },
            areaServed: ["Essonne", "Val-de-Marne", "Seine-et-Marne"],
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqGenerale.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.reponse },
            })),
        },
    ];

    return (
        <>
            <Seo title={title} description={description} path={path} jsonLd={jsonLd} />
            <Breadcrumbs items={breadcrumbItems} />
            <PageHero
                eyebrow="Textile, cuir et Alcantara"
                title={title}
                intro="Laveoo nettoie vos sièges de voiture à domicile, quel que soit le revêtement, avec du matériel professionnel adapté à chaque matière."
            />

            <section className="bg-white py-16 lg:py-20">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <h2 className="reveal-card text-2xl font-black text-[#1F3A5F] sm:text-3xl">Notre méthode</h2>
                    <p className="reveal-card mt-5 leading-8 text-[#595959]">
                        Nous utilisons du matériel professionnel d'injection-extraction, bien plus efficace qu'une shampouineuse grand public, avec des produits adaptés à chaque revêtement (tissu, cuir, cuir perforé, Alcantara).
                        {" "}
                        <Link to="/nos-methodes-de-nettoyage" className="font-semibold text-[#1769E8] underline">Découvrez notre protocole complet</Link>.
                    </p>
                </div>
            </section>

            <VideoSection />

            <div className="reveal-card -mt-8 flex justify-center pb-16 lg:pb-20">
                <Link to="/reservation" className="premium-button inline-flex min-h-12 items-center justify-center rounded-full bg-[#1F3A5F] px-8 py-3 font-semibold text-white shadow-[0_12px_28px_rgba(31,58,95,0.18)]">
                    Réserver mon nettoyage
                </Link>
            </div>

            <section className="bg-[#F5F5F5] py-16 lg:py-20">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <h2 className="reveal-card text-2xl font-black text-[#1F3A5F] sm:text-3xl">Tous les revêtements, toutes les salissures</h2>
                    <p className="reveal-card mt-5 leading-8 text-[#595959]">
                        Sièges en tissu, en cuir, en cuir perforé ou en Alcantara : chaque matière a ses propres fragilités. Le tissu absorbe vite les liquides, le cuir craint les produits trop agressifs, les perforations du cuir perforé retiennent la poussière, et l'Alcantara demande un nettoyage particulièrement délicat pour ne pas marquer sa texture.
                    </p>
                    <p className="reveal-card mt-4 leading-8 text-[#595959]">
                        Côté salissures, nous traitons aussi bien les taches du quotidien (café, boissons, nourriture) que les cas plus difficiles : poils d'animaux incrustés, transpiration, chewing-gum collé ou vomi d'enfant.
                    </p>

                    <div className="mt-10 grid gap-6 sm:grid-cols-2">
                        <div className="reveal-card">
                            <BeforeAfterSlider
                                before="/results/nettoyage-banquette-arriere-cuir-avant.webp"
                                after="/results/nettoyage-banquette-arriere-cuir-apres.webp"
                                alt="Avant-après du nettoyage d'une banquette en cuir"
                                title="Siège en cuir"
                            />
                        </div>
                        <div className="reveal-card">
                            <BeforeAfterSlider
                                before="/results/nettoyage-siege-conducteur-208-avant.webp"
                                after="/results/nettoyage-siege-conducteur-208-apres.webp"
                                alt="Avant-après du nettoyage d'un siège en tissu"
                                title="Siège en tissu"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-16 lg:py-20">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <h2 className="reveal-card text-2xl font-black text-[#1F3A5F] sm:text-3xl">Nos guides pratiques</h2>
                    <p className="reveal-card mt-4 leading-7 text-[#595959]">Une tache précise ? Consultez nos guides étape par étape avant de faire appel à un professionnel :</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {guidesTaches.map((g) => (
                            <Link
                                key={g.slug}
                                to={`/comment-nettoyer/${g.slug}`}
                                className="reveal-card rounded-2xl border border-[#93B8D8]/50 bg-[#F8FAFC] px-5 py-4 font-semibold text-[#1F3A5F] transition hover:border-[#1769E8] hover:bg-white"
                            >
                                {g.h1}
                            </Link>
                        ))}
                        <Link
                            to="/comment-nettoyer"
                            className="reveal-card flex items-center justify-center rounded-2xl border border-[#1F3A5F]/15 bg-white px-5 py-4 font-bold text-[#1769E8] transition hover:border-[#1769E8]"
                        >
                            Voir tous nos guides →
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-[#EAF2FB] py-16 lg:py-20">
                <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="reveal-card text-2xl font-black text-[#1F3A5F] sm:text-3xl">Tarifs</h2>
                    <p className="reveal-card mx-auto mt-5 max-w-2xl leading-8 text-[#595959]">
                        Le nettoyage des sièges est inclus dans nos forfaits de nettoyage intérieur complet : <strong>79 €</strong> pour une citadine, <strong>99 €</strong> pour une compacte/berline/SUV compact, <strong>119 €</strong> pour un grand SUV, monospace ou break. Déplacement inclus, pas de supplément caché.
                    </p>
                    <Link to="/tarifs" className="premium-button mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#1F3A5F] px-8 py-3 font-semibold text-white">Voir le détail des forfaits</Link>
                    <p className="reveal-card mt-4 text-sm text-[#595959]">
                        Vérifiez si nous intervenons près de chez vous sur notre <Link to="/nos-zones-d-intervention" className="font-semibold text-[#1769E8] underline">page zones d'intervention</Link>.
                    </p>
                </div>
            </section>

            <section className="bg-white py-16 lg:py-20">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="reveal-card flex flex-wrap items-baseline justify-between gap-3">
                        <h2 className="text-2xl font-black text-[#1F3A5F] sm:text-3xl">Questions fréquentes</h2>
                        <Link to="/faq" className="text-sm font-semibold text-[#1769E8] underline">Voir toute la FAQ</Link>
                    </div>
                    <div className="mt-6 grid gap-4">
                        {faqGenerale.map((item) => (
                            <details key={item.question} className="reveal-card group rounded-[1.5rem] border border-[#93B8D8]/70 bg-white p-5 shadow-[0_12px_34px_rgba(31,58,95,0.06)]">
                                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-bold leading-7 text-[#1F3A5F]">
                                    <span>{item.question}</span>
                                    <span aria-hidden="true" className="mt-0.5 text-xl transition group-open:rotate-45">+</span>
                                </summary>
                                <p className="mt-4 border-t border-slate-100 pt-4 leading-8 text-[#595959]">{item.reponse}</p>
                            </details>
                        ))}
                    </div>

                    <SectionCta
                        title="Besoin d'un nettoyage professionnel de vos sièges ?"
                        text="Laveoo intervient à domicile dans le sud de l'Île-de-France, avec un matériel adapté à chaque revêtement."
                        label="Voir les tarifs"
                        to="/tarifs"
                        secondaryLabel="Réserver mon nettoyage"
                        secondaryTo="/reservation"
                    />
                </div>
            </section>
        </>
    );
}
