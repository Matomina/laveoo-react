import PageHero from "../components/PageHero";
import ResultsSection from "../components/ResultsSection";
import SectionCta from "../components/SectionCta";
import Seo from "../components/Seo";

export default function ResultsPage() {
    return <><Seo title="Avant-après nettoyage intérieur voiture" description="Découvrez les résultats avant-après des prestations de nettoyage intérieur automobile à domicile réalisées par Laveoo." path="/resultats" /><PageHero eyebrow="Résultats réels" title="Avant-après notre lavage intérieur de voiture" intro="Faites glisser le curseur sur chaque image pour comparer l’état de l’habitacle avant et après notre intervention." /><ResultsSection /><section className="bg-[#F5F5F5] py-16"><div className="mx-auto max-w-5xl px-4 sm:px-6"><SectionCta title="Envie du même résultat ?" text="Choisissez le forfait adapté à votre véhicule et réservez votre intervention à domicile." label="Voir les tarifs" to="/tarifs" secondaryLabel="Réserver" secondaryTo="/reservation" /></div></section></>;
}