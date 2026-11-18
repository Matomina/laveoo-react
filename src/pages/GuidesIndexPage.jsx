import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import SectionCta from "../components/SectionCta";
import Breadcrumbs from "../components/Breadcrumbs";
import { guidesTaches } from "../data/guidesTaches";

const breadcrumbItems = [
    { name: "Accueil", to: "/" },
    { name: "Nos guides", to: "/comment-nettoyer" },
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

export default function GuidesIndexPage() {
    return (
        <>
            <Seo
                title="Tous nos guides de nettoyage auto"
                description="Nos guides pratiques pour nettoyer soi-même l'intérieur de sa voiture : taches, odeurs, matières et situations courantes."
                path="/comment-nettoyer"
                jsonLd={breadcrumbJsonLd}
            />
            <Breadcrumbs items={breadcrumbItems} />
            <PageHero
                eyebrow="Guides pratiques"
                title="Tous nos guides de nettoyage auto"
                intro="Une tache ou un problème précis à régler vous-même ? Retrouvez ici l'ensemble de nos guides étape par étape, avant de faire appel à un professionnel."
            />

            <section className="bg-white py-16 lg:py-20">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-3 sm:grid-cols-2">
                        {guidesTaches.map((g) => (
                            <Link
                                key={g.slug}
                                to={`/comment-nettoyer/${g.slug}`}
                                className="reveal-card rounded-2xl border border-[#93B8D8]/50 bg-[#F8FAFC] px-5 py-4 font-semibold text-[#1F3A5F] transition hover:border-[#1769E8] hover:bg-white"
                            >
                                {g.h1}
                            </Link>
                        ))}
                    </div>

                    <p className="reveal-card mt-8 text-center text-sm text-[#595959]">
                        D'autres guides arrivent régulièrement : revenez de temps en temps pour en découvrir de nouveaux.
                    </p>

                    <p className="reveal-card mt-4 text-center text-sm text-[#595959]">
                        Besoin d'un nettoyage complet plutôt qu'un bricolage ?{" "}
                        <Link to="/nettoyage-auto-domicile" className="font-semibold text-[#1769E8] underline">Découvrez notre service à domicile</Link>.
                    </p>

                    <SectionCta
                        title="Un nettoyage professionnel, sans contrainte"
                        text="Laveoo se déplace à domicile dans le sud de l'Île-de-France pour un nettoyage complet de votre véhicule."
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
