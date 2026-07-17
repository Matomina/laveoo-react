import ClientContent from "../components/ClientContent";
import PageHero from "../components/PageHero";
import SectionCta from "../components/SectionCta";
import Seo from "../components/Seo";

export default function SeoContentPage({ title, intro, description, path, raw, eyebrow }) {
    return (
        <>
            <Seo title={title} description={description} path={path} />
            <PageHero eyebrow={eyebrow} title={title} intro={intro} />
            <section className="bg-white py-16 lg:py-20"><div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"><ClientContent raw={raw} /><SectionCta title="Besoin d’un nettoyage professionnel à domicile ?" text="Choisissez votre forfait ou contactez-nous pour préparer votre intervention." label="Voir les tarifs" to="/tarifs" secondaryLabel="Nous contacter" secondaryTo="/contact" /></div></section>
        </>
    );
}
