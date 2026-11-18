import ClientContent from "../components/ClientContent";
import { parseFaqSections } from "../utils/parseClientContent";
import PageHero from "../components/PageHero";
import SectionCta from "../components/SectionCta";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import faqRaw from "../content/faq.txt?raw";

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: parseFaqSections(faqRaw).flatMap((section) =>
        section.items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer.join(" "),
            },
        })),
    ),
};

const breadcrumbItems = [
    { name: "Accueil", to: "/" },
    { name: "FAQ", to: "/faq" },
].map((item) => ({ ...item, url: `https://www.laveoo.com${item.to === "/" ? "/" : item.to}` }));

const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
    })),
};

export default function FaqPage() {
    return (
        <>
            <Seo title="Questions fréquentes" description="Toutes les réponses concernant le nettoyage intérieur automobile Laveoo : préparation, prestation, matériaux, taches, séchage, réservation et intervention à domicile." path="/faq" jsonLd={[faqJsonLd, breadcrumbJsonLd]} />
            <Breadcrumbs items={breadcrumbItems} />
            <PageHero eyebrow="Tout savoir avant votre rendez-vous" title="Questions fréquentes" intro="Retrouvez les réponses aux questions les plus fréquentes sur le déroulement de nos prestations, les véhicules pris en charge, les matériaux nettoyés et l’entretien de votre habitacle." />
            <section className="bg-[#F5F5F5] py-16 lg:py-20"><div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"><ClientContent raw={faqRaw} faq /><SectionCta title="Vous n’avez pas trouvé votre réponse ?" text="Contactez-nous : nous serons ravis de vous renseigner et de préparer votre intervention." label="Nous contacter" to="/contact" /></div></section>
        </>
    );
}
