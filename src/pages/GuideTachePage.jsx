import { useParams, Link } from "react-router-dom";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import SectionCta from "../components/SectionCta";
import Breadcrumbs from "../components/Breadcrumbs";
import NotFoundPage from "./NotFoundPage";
import { guidesTaches } from "../data/guidesTaches";

export default function GuideTachePage() {
    const { slug } = useParams();
    const guide = guidesTaches.find((g) => g.slug === slug);
    const autresGuides = guidesTaches.filter((g) => g.slug !== slug);

    if (!guide) return <NotFoundPage />;

    const path = `/comment-nettoyer/${guide.slug}`;

    const breadcrumbItems = [
        { name: "Accueil", to: "/" },
        { name: "Nos guides", to: "/comment-nettoyer" },
        { name: guide.h1, to: path },
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
            name: guide.h1,
            description: guide.description,
            step: guide.etapes.map((texte, index) => ({
                "@type": "HowToStep",
                position: index + 1,
                text: texte,
            })),
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: guide.faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.reponse },
            })),
        },
    ];

    return (
        <>
            <Seo title={guide.seoTitle} description={guide.description} path={path} image={guide.afterImage} jsonLd={jsonLd} />
            <Breadcrumbs items={breadcrumbItems} />
            <PageHero eyebrow="Guide pratique" title={guide.h1} intro={guide.intro} />

            <section className="bg-white py-16 lg:py-20">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <h2 className="reveal-card text-2xl font-black text-[#1F3A5F] sm:text-3xl">Les étapes</h2>
                    <ol className="mt-6 space-y-4">
                        {guide.etapes.map((etape, index) => (
                            <li key={index} className="reveal-card flex gap-4 rounded-2xl bg-[#F8FAFC] p-5">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1F3A5F] text-sm font-black text-white">
                                    {index + 1}
                                </span>
                                <p className="leading-7 text-[#595959]">{etape}</p>
                            </li>
                        ))}
                    </ol>

                    <div className="reveal-card mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                        <p className="font-bold text-amber-800">⚠️ Attention</p>
                        <p className="mt-2 leading-7 text-amber-900">{guide.attention}</p>
                    </div>

                    <div className="reveal-card mx-auto mt-10 max-w-md">
                        <BeforeAfterSlider before={guide.beforeImage} after={guide.afterImage} alt={guide.imageAlt} title="Avant / après" />
                    </div>

                    <div className="reveal-card mt-12 rounded-[1.5rem] bg-[#EAF2FB] p-6 sm:p-8">
                        <h2 className="text-xl font-black text-[#1F3A5F]">Pas le temps ou pas envie de le faire vous-même ?</h2>
                        <p className="mt-3 leading-7 text-[#595959]">
                            Laveoo intervient directement à votre domicile avec du <Link to="/nos-methodes-de-nettoyage" className="font-semibold text-[#1769E8] underline">matériel professionnel d'injection-extraction</Link>, bien plus efficace qu'un nettoyage manuel pour les taches incrustées. Le nettoyage des sièges est inclus dans nos forfaits à partir de 79€.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-3">
                            <Link to="/reservation" className="premium-button inline-flex min-h-12 items-center justify-center rounded-full bg-[#1F3A5F] px-6 py-3 font-semibold text-white">Réserver mon nettoyage</Link>
                            <Link to="/nettoyage-sieges-voiture" className="premium-button inline-flex min-h-12 items-center justify-center rounded-full border border-[#1F3A5F]/15 bg-white px-6 py-3 font-semibold text-[#1F3A5F]">En savoir plus sur le nettoyage des sièges</Link>
                        </div>
                    </div>

                    <h2 className="reveal-card mt-14 text-2xl font-black text-[#1F3A5F] sm:text-3xl">Questions fréquentes</h2>
                    <div className="mt-6 grid gap-4">
                        {guide.faq.map((item) => (
                            <details key={item.question} className="reveal-card group rounded-[1.5rem] border border-[#93B8D8]/70 bg-white p-5 shadow-[0_12px_34px_rgba(31,58,95,0.06)]">
                                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-bold leading-7 text-[#1F3A5F]">
                                    <span>{item.question}</span>
                                    <span aria-hidden="true" className="mt-0.5 text-xl transition group-open:rotate-45">+</span>
                                </summary>
                                <p className="mt-4 border-t border-slate-100 pt-4 leading-8 text-[#595959]">{item.reponse}</p>
                            </details>
                        ))}
                    </div>

                    <h2 className="reveal-card mt-14 text-2xl font-black text-[#1F3A5F] sm:text-3xl">Autres taches sur siège en tissu</h2>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {autresGuides.map((g) => (
                            <Link
                                key={g.slug}
                                to={`/comment-nettoyer/${g.slug}`}
                                className="reveal-card rounded-2xl border border-[#93B8D8]/50 bg-[#F8FAFC] px-5 py-4 font-semibold text-[#1F3A5F] transition hover:border-[#1769E8] hover:bg-white"
                            >
                                {g.h1}
                            </Link>
                        ))}
                    </div>

                    <SectionCta
                        title="Un nettoyage professionnel, sans contrainte"
                        text="Laveoo se déplace à domicile dans le sud de l'Île-de-France pour un nettoyage complet de vos sièges."
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
