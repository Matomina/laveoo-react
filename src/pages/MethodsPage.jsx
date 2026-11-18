import { Link } from "react-router-dom";
import MethodSection, { ETAPES } from "../components/MethodSection";
import PageHero from "../components/PageHero";
import SectionCta from "../components/SectionCta";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";

const faqMethode = [
    {
        question: "Pourquoi passer de l'air comprimé avant l'aspiration ?",
        reponse: "L'air comprimé déloge les miettes, le sable et la poussière incrustés au fond des fibres, là où un aspirateur seul n'atteint pas. Il redresse aussi les fibres de la moquette et des sièges, pour un rendu plus net.",
    },
    {
        question: "Le brossage du cuir avec un produit à pH neutre, c'est pour quoi faire ?",
        reponse: "Un produit mal dosé en pH assèche le cuir et accélère son vieillissement. Le pH neutre nettoie en profondeur sans fragiliser la matière ni en altérer la souplesse.",
    },
    {
        question: "Le destructeur d'odeurs masque-t-il juste l'odeur ou la traite-t-il vraiment ?",
        reponse: "Il neutralise l'odeur à la source plutôt que de la recouvrir par un parfum. C'est pour ça qu'il intervient en toute fin de protocole, une fois toutes les causes (taches, humidité, poils) déjà traitées.",
    },
    {
        question: "Le dressing laisse-t-il un effet brillant ou gras ?",
        reponse: "Non, nous recherchons un rendu mat et naturel, aussi bien sur les plastiques que sur le cuir — pas un effet brillant artificiel qui ne dure de toute façon pas dans le temps.",
    },
];

export default function MethodsPage() {
    const path = "/nos-methodes-de-nettoyage";
    const title = "Notre méthode de nettoyage intérieur automobile";
    const description = "La méthode Laveoo étape par étape : air comprimé, shampoing des sièges, brossage du cuir au pH neutre, plastiques, dressing et destructeur d'odeurs.";

    const breadcrumbItems = [
        { name: "Accueil", to: "/" },
        { name: "Nos méthodes", to: path },
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
            "@type": "HowTo",
            name: title,
            description,
            step: ETAPES.map((e, index) => ({ "@type": "HowToStep", position: index + 1, name: e.titre, text: e.texte })),
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqMethode.map((item) => ({
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
            <PageHero eyebrow="Protocole Laveoo" title="Notre méthode de nettoyage intérieur automobile professionnelle" intro="Une méthode pensée pour offrir un résultat impeccable, sans compromis sur les matériaux de votre véhicule." />
            <MethodSection />

            <div className="reveal-card flex justify-center bg-[#F5F5F5] pb-16 lg:pb-20">
                <Link to="/reservation" className="premium-button inline-flex min-h-12 items-center justify-center rounded-full bg-[#1F3A5F] px-8 py-3 font-semibold text-white shadow-[0_12px_28px_rgba(31,58,95,0.18)]">
                    Réserver mon nettoyage
                </Link>
            </div>

            <section className="bg-white py-16 lg:py-20">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <h2 className="reveal-card text-2xl font-black text-[#1F3A5F] sm:text-3xl">Un produit et une technique par matière</h2>
                    <div className="mt-6 space-y-5">
                        <p className="reveal-card leading-8 text-[#595959]">
                            <strong className="text-[#1F3A5F]">Cuir</strong> — un nettoyage trop agressif l'assèche et accélère son vieillissement. Notre brossage au pH neutre élimine les saletés en respectant la texture d'origine, coutures et perforations comprises.
                        </p>
                        <p className="reveal-card leading-8 text-[#595959]">
                            <strong className="text-[#1F3A5F]">Alcantara</strong> — un brossage trop appuyé ou un produit inadapté écrase ses fibres. Nous adaptons la pression et le produit pour préserver son toucher caractéristique.
                        </p>
                        <p className="reveal-card leading-8 text-[#595959]">
                            <strong className="text-[#1F3A5F]">Plastiques et finitions noir brillant (Piano Black)</strong> — particulièrement sensibles aux micro-rayures, ils sont nettoyés avec des microfibres dédiées et un produit spécial, pour un rendu mat et naturel plutôt qu'un effet brillant artificiel.
                        </p>
                        <p className="reveal-card leading-8 text-[#595959]">
                            <strong className="text-[#1F3A5F]">Écrans tactiles</strong> — nettoyés avec des accessoires spécifiques pour éviter traces et micro-rayures sur une surface qui ne pardonne pas les produits inadaptés.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-[#F5F5F5] py-16 lg:py-20">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="reveal-card flex flex-wrap items-baseline justify-between gap-3">
                        <h2 className="text-2xl font-black text-[#1F3A5F] sm:text-3xl">Questions fréquentes sur notre méthode</h2>
                        <Link to="/faq" className="text-sm font-semibold text-[#1769E8] underline">Voir toute la FAQ</Link>
                    </div>
                    <div className="mt-6 grid gap-4">
                        {faqMethode.map((item) => (
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
                        title="Confiez votre habitacle à un spécialiste"
                        text="Notre protocole est adapté à votre véhicule, à ses matériaux et à son niveau d'encrassement."
                        label="Réserver mon nettoyage"
                        to="/reservation"
                        secondaryLabel="Voir les tarifs"
                        secondaryTo="/tarifs"
                    />
                </div>
            </section>
        </>
    );
}
