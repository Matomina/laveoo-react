import { Link, useParams } from "react-router-dom";
import Hero from "../components/Hero";
import PricingSection from "../components/PricingSection";
import ResultsSection from "../components/ResultsSection";
import SectionCta from "../components/SectionCta";
import Seo from "../components/Seo";
import NotFoundPage from "./NotFoundPage";
import { siteData } from "../data/siteData";
import { villes } from "../data/villes";
import renderWithLinks from "../utils/renderWithLinks";

export default function VillePage() {
    const { slug } = useParams();
    const ville = villes.find((v) => v.slug === slug);

    if (!ville) return <NotFoundPage />;

    const { faq, results } = siteData;
    const featuredComparisons = results.comparisons.filter(({ id }) =>
        ["comparison-4", "comparison-5", "comparison-6", "comparison-7"].includes(id),
    );
    const villesProches = ville.villesProches
        .map((s) => villes.find((v) => v.slug === s))
        .filter(Boolean);
    const generalFaqItem = faq.items[ville.faqGeneralIndex];

    return (
        <>
            <Seo title={ville.seoTitle} description={ville.seoDescription} path={`/nettoyage-auto/${ville.slug}`} />
            <Hero title={ville.h1} subtitle={ville.intro} />
            <PricingSection title={ville.tarifsTitle} intro={ville.tarifsText} />
            <ResultsSection comparisons={featuredComparisons} columns={4} title={ville.resultatsTitle} intro={ville.resultatsText} />

            <section className="bg-[#F5F5F5] py-20 lg:py-24" aria-labelledby="ville-seo-title">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <h2 id="ville-seo-title" className="reveal-card text-4xl font-black tracking-tight text-[#1F3A5F] sm:text-5xl">{ville.seoSectionTitle}</h2>
                    <div className="reveal-card mt-8 space-y-5">
                        {ville.seoSectionParagraphs.map((paragraph, index) => (
                            <p key={index} className="text-base leading-8 text-[#595959]">{renderWithLinks(paragraph, `seo-${index}`)}</p>
                        ))}
                    </div>
                </div>
            </section>

            {villesProches.length > 0 && (
                <section className="bg-white py-16 lg:py-20" aria-labelledby="villes-proches-title">
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        <div className="reveal-card rounded-[2rem] bg-[#EAF2FB] p-8 text-center lg:p-10">
                            <h2 id="villes-proches-title" className="text-2xl font-black text-[#1F3A5F] sm:text-3xl">Laveoo intervient aussi près de {ville.nom}</h2>
                            <div className="mt-6 flex flex-wrap justify-center gap-3">
                                {villesProches.map((v) => (
                                    <Link key={v.slug} to={`/nettoyage-auto/${v.slug}`} className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#1769E8] shadow-sm transition hover:shadow-md">
                                        Nettoyage auto à {v.nom}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <section className="bg-[#F5F5F5] py-20 lg:py-24" aria-labelledby="ville-faq-title">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <header className="reveal-card text-center">
                        <h2 id="ville-faq-title" className="text-4xl font-black text-[#1F3A5F] sm:text-5xl">Questions fréquentes à {ville.nom}</h2>
                    </header>
                    <div className="mt-10 grid gap-4">
                        {ville.faqLocale.map((item) => (
                            <details key={item.question} className="reveal-card group rounded-[1.5rem] border border-[#93B8D8]/65 bg-white p-6 shadow-[0_12px_34px_rgba(31,58,95,0.06)]">
                                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-bold text-[#1F3A5F]"><span>{item.question}</span><span className="text-xl transition group-open:rotate-45">+</span></summary>
                                <p className="mt-4 border-t border-slate-100 pt-4 leading-8 text-[#595959]">{item.answer}</p>
                            </details>
                        ))}
                        {generalFaqItem && (
                            <details key={generalFaqItem.question} className="reveal-card group rounded-[1.5rem] border border-[#93B8D8]/65 bg-white p-6 shadow-[0_12px_34px_rgba(31,58,95,0.06)]">
                                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-bold text-[#1F3A5F]"><span>{generalFaqItem.question}</span><span className="text-xl transition group-open:rotate-45">+</span></summary>
                                <p className="mt-4 border-t border-slate-100 pt-4 leading-8 text-[#595959]">{generalFaqItem.answer}</p>
                            </details>
                        )}
                    </div>
                    <SectionCta title="Vous avez encore une question ?" text="La FAQ complète répond aux questions sur la préparation, les matériaux, les taches, le séchage et la réservation." label="Consulter la FAQ complète" to="/faq" secondaryLabel="Nous contacter" secondaryTo="/contact" />
                </div>
            </section>

            <section className="bg-white py-20 lg:py-24">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <SectionCta title={`Votre habitacle mérite un nettoyage professionnel à ${ville.nom}`} text="Choisissez votre forfait et réservez en ligne en quelques clics pour un rendez-vous à domicile." label="Réserver en ligne" to="/reservation" secondaryLabel="Voir les tarifs" secondaryTo="/tarifs" />
                </div>
            </section>
        </>
    );
}