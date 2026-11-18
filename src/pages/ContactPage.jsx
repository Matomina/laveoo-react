import ContactSection from "../components/ContactSection";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";

export default function ContactPage() {
    const breadcrumbItems = [
        { name: "Accueil", to: "/" },
        { name: "Contact", to: "/contact" },
    ].map((item) => ({ ...item, url: `https://www.laveoo.com${item.to === "/" ? "/" : item.to}` }));

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <>
            <Seo title="Contact et réservation" description="Contactez Laveoo par téléphone, SMS, WhatsApp ou e-mail pour réserver votre nettoyage intérieur automobile à domicile dans le sud de l’Île-de-France." path="/contact" jsonLd={jsonLd} />
            <Breadcrumbs items={breadcrumbItems} />
            <PageHero eyebrow="Une réponse rapide" title="Contactez Laveoo" intro="Indiquez-nous votre commune, le modèle de votre véhicule et le forfait souhaité. Nous conviendrons ensemble d’une date et d’un horaire adaptés." />
            <ContactSection />
        </>
    );
}
