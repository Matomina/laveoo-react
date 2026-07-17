import ClientContent from "../components/ClientContent";
import MethodSection from "../components/MethodSection";
import PageHero from "../components/PageHero";
import SectionCta from "../components/SectionCta";
import Seo from "../components/Seo";
import methodsRaw from "../content/methodes.txt?raw";

export default function MethodsPage() {
    return (
        <>
            <Seo title="Notre méthode de nettoyage intérieur automobile" description="Découvrez la méthode professionnelle Laveoo : air comprimé, vapeur, injection-extraction et techniques adaptées au cuir, à l’Alcantara, aux textiles et plastiques sensibles." path="/nos-methodes-de-nettoyage" />
            <PageHero eyebrow="Protocole Laveoo" title="Notre méthode de nettoyage intérieur automobile professionnelle" intro="Une méthode pensée pour offrir un résultat impeccable, sans compromis sur les matériaux de votre véhicule." />
            <MethodSection />
            <section className="bg-white py-16 lg:py-20"><div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"><ClientContent raw={methodsRaw} /><SectionCta title="Confiez votre habitacle à un spécialiste" text="Notre protocole est adapté à votre véhicule, à ses matériaux et à son niveau d’encrassement." label="Prendre rendez-vous" to="/contact" secondaryLabel="Voir les tarifs" secondaryTo="/tarifs" /></div></section>
        </>
    );
}
