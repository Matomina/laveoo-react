import ClientContent from "../components/ClientContent";
import PageHero from "../components/PageHero";
import SectionCta from "../components/SectionCta";
import Seo from "../components/Seo";
import faqRaw from "../content/faq.txt?raw";

export default function FaqPage() {
    return (
        <>
            <Seo title="Questions fréquentes" description="Toutes les réponses concernant le nettoyage intérieur automobile Laveoo : préparation, prestation, matériaux, taches, séchage, réservation et intervention à domicile." path="/faq" />
            <PageHero eyebrow="Tout savoir avant votre rendez-vous" title="Questions fréquentes" intro="Retrouvez les réponses aux questions les plus fréquentes sur le déroulement de nos prestations, les véhicules pris en charge, les matériaux nettoyés et l’entretien de votre habitacle." />
            <section className="bg-[#F5F5F5] py-16 lg:py-20"><div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"><ClientContent raw={faqRaw} faq /><SectionCta title="Vous n’avez pas trouvé votre réponse ?" text="Contactez-nous : nous serons ravis de vous renseigner et de préparer votre intervention." label="Nous contacter" to="/contact" /></div></section>
        </>
    );
}
