import ContactSection from "../components/ContactSection";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";

export default function ContactPage() {
    return (
        <>
            <Seo title="Contact et réservation" description="Contactez Laveoo par téléphone, SMS, WhatsApp ou e-mail pour réserver votre nettoyage intérieur automobile à domicile dans le sud de l’Île-de-France." path="/contact" />
            <PageHero eyebrow="Une réponse rapide" title="Contactez Laveoo" intro="Indiquez-nous votre commune, le modèle de votre véhicule et le forfait souhaité. Nous conviendrons ensemble d’une date et d’un horaire adaptés." />
            <ContactSection />
        </>
    );
}
