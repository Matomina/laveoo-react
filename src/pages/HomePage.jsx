import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import PricingSection from "../components/PricingSection";
import ResultsSection from "../components/ResultsSection";
import SectionCta from "../components/SectionCta";
import Seo from "../components/Seo";
import { siteData } from "../data/siteData";
import { villes } from "../data/villes";

export default function HomePage() {
    const { method, whyChoose, faq, results } = siteData;
    const featuredComparisons = results.comparisons.filter(({ id }) =>
        ["comparison-4", "comparison-5", "comparison-6", "comparison-7"].includes(id),
    );
    return (
        <>
            <Seo title="Nettoyage automobile à domicile | Laveoo" description="Nettoyage intérieur automobile professionnel à domicile dans le sud de l’Île-de-France. Trois forfaits transparents à 79 €, 99 € et 119 €." path="/" />
            <Hero />
            <PricingSection />
            <ResultsSection comparisons={featuredComparisons} columns={4} />
            <SectionCta title="Découvrez davantage de transformations" text="Consultez les comparaisons avant-après et faites glisser le curseur pour voir le résultat." label="Voir tous les résultats" to="/resultats" />

            <section className="bg-[#F5F5F5] py-20 lg:py-24" aria-labelledby="home-method-title">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-x-10 lg:gap-y-7">
                        <div className="reveal-card lg:col-start-2 lg:row-start-1">
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#1F3A5F]/60">Notre savoir-faire</p>
                            <h2 id="home-method-title" className="mt-4 text-4xl font-black tracking-tight text-[#1F3A5F] sm:text-5xl">{method.title}</h2>
                            <p className="mt-6 text-lg leading-8 text-[#595959]">{method.intro}</p>
                        </div>
                        <div className="reveal-card overflow-hidden rounded-[2rem] border border-[#93B8D8]/55 bg-white p-3 shadow-[0_22px_65px_rgba(31,58,95,0.12)] lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-center">
                            <img src="/results/apres-02.jpeg" alt="Habitacle après un nettoyage intérieur automobile professionnel Laveoo" className="aspect-[4/3] w-full rounded-[1.5rem] object-cover" loading="lazy" />
                        </div>
                        <div className="reveal-card lg:col-start-2 lg:row-start-2">
                            <div className="grid gap-3 sm:grid-cols-2">
                                {method.items.map((item) => <div key={item.title} className="rounded-2xl bg-white p-5 shadow-[0_10px_28px_rgba(31,58,95,0.06)]"><h3 className="font-black text-[#1F3A5F]">{item.title}</h3><p className="mt-2 text-sm leading-6 text-[#595959]">{item.description}</p></div>)}
                            </div>
                            <Link to="/nos-methodes-de-nettoyage" className="premium-button mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#1F3A5F] px-6 py-3 font-semibold text-white">Découvrir notre méthode</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-20 lg:py-24" aria-labelledby="why-title">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <header className="reveal-card mx-auto max-w-3xl text-center">
                        <h2 id="why-title" className="text-4xl font-black tracking-tight text-[#1F3A5F] sm:text-5xl">{whyChoose.title}</h2>
                        <p className="mt-5 text-lg leading-8 text-[#595959]">{whyChoose.intro}</p>
                    </header>
                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {whyChoose.items.map((item, index) => <article key={item.title} className="reveal-card premium-card rounded-[1.75rem] border border-[#93B8D8]/55 bg-[#F8FAFC] p-6 shadow-[0_14px_40px_rgba(31,58,95,0.07)]"><span className="text-xs font-black text-[#1769E8]">0{index + 1}</span><h3 className="mt-4 text-xl font-black text-[#1F3A5F]">{item.title}</h3><p className="mt-3 text-sm leading-7 text-[#595959]">{item.text}</p></article>)}
                    </div>
                </div>
            </section>

            <section className="bg-[#F5F5F5] py-20 lg:py-24" aria-labelledby="home-faq-title">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <header className="reveal-card text-center"><h2 id="home-faq-title" className="text-4xl font-black text-[#1F3A5F] sm:text-5xl">{faq.title}</h2></header>
                    <div className="mt-10 grid gap-4">
                        {faq.items.slice(0, 4).map((item) => <details key={item.question} className="reveal-card group rounded-[1.5rem] border border-[#93B8D8]/65 bg-white p-6 shadow-[0_12px_34px_rgba(31,58,95,0.06)]"><summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-bold text-[#1F3A5F]"><span>{item.question}</span><span className="text-xl transition group-open:rotate-45">+</span></summary><p className="mt-4 border-t border-slate-100 pt-4 leading-8 text-[#595959]">{item.answer}</p></details>)}
                    </div>
                    <SectionCta title="Vous avez encore une question ?" text="La FAQ complète répond aux questions sur la préparation, les matériaux, les taches, le séchage et la réservation." label="Consulter la FAQ complète" to="/faq" secondaryLabel="Nous contacter" secondaryTo="/contact" />
                </div>
            </section>

            <section className="bg-white py-16 lg:py-20" aria-labelledby="zones-title">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="reveal-card rounded-[2rem] bg-[#EAF2FB] p-8 text-center lg:p-10">
                        <h2 id="zones-title" className="text-2xl font-black text-[#1F3A5F] sm:text-3xl">Nos zones d'intervention</h2>
                        <p className="mt-3 text-[#595959]">Laveoo intervient dans plusieurs communes du sud de l'Île-de-France</p>
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            {villes.map((ville) => (
                                <Link key={ville.slug} to={`/nettoyage-auto/${ville.slug}`} className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#1769E8] shadow-sm transition hover:shadow-md">
                                    Nettoyage auto à {ville.nom}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-20 lg:py-24">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <SectionCta title="Votre habitacle mérite un nettoyage professionnel" text="Appelez-nous ou envoyez-nous un message pour choisir votre forfait et convenir d’un rendez-vous à domicile." label="Prendre rendez-vous" to="/contact" secondaryLabel="Voir les tarifs" secondaryTo="/tarifs" />
                </div>
            </section>
        </>
    );
}