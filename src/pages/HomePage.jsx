import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import PricingSection from "../components/PricingSection";
import ResultsSection from "../components/ResultsSection";
import SectionCta from "../components/SectionCta";
import Seo from "../components/Seo";
import HowItWorks from "../components/HowItWorks";
import HeroComparison from "../components/HeroComparison";
import VideoSection from "../components/VideoSection";
import GoogleReviewsSection from "../components/GoogleReviewsSection";
import ChatInline from "../components/ChatInline";
import { siteData } from "../data/siteData";
import { villes } from "../data/villes";
import { departements } from "../data/departements";
import { companyInfo } from "../data/companyInfo";
import renderWithLinks from "../utils/renderWithLinks";

const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: companyInfo.name,
    image: "https://www.laveoo.com/og-image.jpg",
    url: "https://www.laveoo.com/",
    telephone: companyInfo.phoneDisplay,
    priceRange: "79 € - 119 €",
    openingHoursSpecification: companyInfo.openingHoursSpecification,
    areaServed: ["Sud de l'Île-de-France", "Essonne", "Val-de-Marne", "Seine-et-Marne"],
    address: {
        "@type": "PostalAddress",
        streetAddress: "1 place de la Résidence",
        addressLocality: "Orly",
        postalCode: "94310",
        addressCountry: "FR",
    },
    description: "Service professionnel de nettoyage intérieur automobile à domicile en Essonne, dans le Val-de-Marne et en Seine-et-Marne.",
};

export default function HomePage() {
    const { method, whyChoose, faq, results } = siteData;
    // Ordre volontairement fixe (indépendant du rangement de la page
    // /resultats) : on choisit l'id dans l'ordre voulu plutôt que de
    // filtrer, pour ne pas dépendre de la position de chaque photo dans
    // la liste complète.
    const featuredComparisons = ["comparison-11", "comparison-18", "comparison-23", "comparison-6", "comparison-7"]
        .map((id) => results.comparisons.find((c) => c.id === id))
        .filter(Boolean);
    return (
        <>
            <Seo title="Nettoyage automobile à domicile 91/94/77 | Laveoo" description="Nettoyage intérieur automobile professionnel à domicile en Essonne, Val-de-Marne et Seine-et-Marne. Forfaits dès 79 €, déplacement inclus. Réservez en quelques clics." path="/" jsonLd={homeJsonLd} />
            <Hero />
            <HeroComparison />
            <ChatInline />
            <HowItWorks />
            <PricingSection />
            <VideoSection />
            <ResultsSection comparisons={featuredComparisons} columns={4} />
            <div className="reveal-card -mt-8 flex justify-center pb-20 lg:pb-24">
                <Link
                    to="/resultats"
                    className="premium-button inline-flex min-h-12 items-center justify-center rounded-full bg-[#1F3A5F] px-8 py-3 font-semibold text-white shadow-[0_12px_28px_rgba(31,58,95,0.18)]"
                >
                    Voir plus de photos
                </Link>
            </div>
            <GoogleReviewsSection />

            <section className="bg-white py-20 lg:py-24" aria-labelledby="home-method-title">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-x-10 lg:gap-y-7">
                        <div className="reveal-card lg:col-start-2 lg:row-start-1">
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#1F3A5F]/60">Notre savoir-faire</p>
                            <h2 id="home-method-title" className="mt-4 text-4xl font-black tracking-tight text-[#1F3A5F] sm:text-5xl">{method.homeTitle}</h2>
                            <p className="mt-6 text-lg leading-8 text-[#595959]">{method.lead}</p>
                            <p className="mt-4 text-lg leading-8 text-[#595959]">{renderWithLinks(method.homeIntro, "method-intro")}</p>
                        </div>
                        <div className="reveal-card overflow-hidden rounded-[2rem] border border-[#93B8D8]/55 shadow-[0_22px_65px_rgba(31,58,95,0.12)] lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-center">
                            <img src="/methode-nettoyage.webp" alt="Technicien Laveoo effectuant un nettoyage intérieur automobile professionnel" className="aspect-[4/3] w-full object-cover" loading="lazy" />
                        </div>
                        <div className="reveal-card lg:col-start-2 lg:row-start-2">
                            <div className="grid gap-3 sm:grid-cols-2">
                                {method.homeHighlights.map((item, index) => <div key={item.title} className="rounded-2xl bg-white p-5 shadow-[0_10px_28px_rgba(31,58,95,0.06)]"><h3 className="font-black text-[#1F3A5F]">{item.title}</h3><p className="mt-2 text-sm leading-6 text-[#595959]">{item.description}</p></div>)}
                            </div>
                            <div className="mt-6 space-y-3">
                                {method.closingParagraphs.map((paragraph, index) => <p key={index} className="text-sm leading-7 text-[#595959]">{paragraph}</p>)}
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
                        {whyChoose.items.map((item, index) => <article key={item.title} className="reveal-card premium-card rounded-[1.75rem] border border-[#93B8D8]/55 bg-[#F8FAFC] p-6 shadow-[0_14px_40px_rgba(31,58,95,0.07)]"><span className="text-xs font-black text-[#1769E8]">{`0${index + 1}`}</span><h3 className="mt-4 text-xl font-black text-[#1F3A5F]">{item.title}</h3><p className="mt-3 text-sm leading-7 text-[#595959]">{item.text}</p></article>)}
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
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="reveal-card rounded-[2rem] bg-[#EAF2FB] p-8 text-center lg:p-10">
                        <h2 id="zones-title" className="text-2xl font-black text-[#1F3A5F] sm:text-3xl">Nos zones d'intervention</h2>
                        <p className="mt-3 text-[#595959]">Laveoo intervient dans plusieurs communes du sud de l'Île-de-France</p>

                        <div className="mt-7 space-y-3 text-left">
                            {departements.map((departement) => {
                                const citiesInDept = villes.filter((v) => v.departement === departement.code);
                                return (
                                    <details key={departement.slug} className="group overflow-hidden rounded-[1.5rem] border border-[#93B8D8]/50 bg-white shadow-[0_14px_40px_rgba(31,58,95,0.07)]">
                                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-bold text-[#1F3A5F]">
                                            <span>{`${departement.nom} (${departement.code})`}</span>
                                            <span className="text-xl transition group-open:rotate-45">+</span>
                                        </summary>
                                        <div className="border-t border-[#93B8D8]/30 p-5">
                                            <div className="flex flex-wrap gap-2.5">
                                                {citiesInDept.map((ville) => (
                                                    <Link key={ville.slug} to={`/nettoyage-auto/${ville.slug}`} className="rounded-full bg-[#F5F5F5] px-4 py-2 text-sm font-semibold text-[#1769E8] transition hover:bg-[#EAF2FB]">
                                                        {ville.nom}
                                                    </Link>
                                                ))}
                                            </div>
                                            <Link to={`/nettoyage-auto-${departement.slug}`} className="mt-4 inline-block text-sm font-bold text-[#1F3A5F] underline underline-offset-4">
                                                {`Voir la page ${departement.nom}`}
                                            </Link>
                                        </div>
                                    </details>
                                );
                            })}
                        </div>

                        <Link to="/nos-zones-d-intervention" className="mt-7 inline-block text-sm font-bold text-[#1F3A5F] underline underline-offset-4">
                            Voir toutes nos zones d'intervention
                        </Link>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-[#1e2840] py-20 lg:py-24">
                <div className="absolute left-1/2 top-0 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
                <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <SectionCta title="Votre habitacle mérite un nettoyage professionnel" text="Choisissez votre forfait et réservez en ligne en quelques clics, pour une intervention sur votre place de parking, dans votre allée ou au pied de votre immeuble." label="Réserver mon nettoyage" to="/reservation" secondaryLabel="Voir les tarifs" secondaryTo="/tarifs" />
                </div>
            </section>
        </>
    );
}