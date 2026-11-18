import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import PricingCards from "../components/PricingCards";
import SectionCta from "../components/SectionCta";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import { includedServices, siteData } from "../data/siteData";
import { companyInfo } from "../data/companyInfo";

const calculations = [
    { title: "La catégorie du véhicule", text: "Une citadine demande moins de temps qu’un SUV, un break ou un monospace. Plus l’habitacle est grand, plus la surface à nettoyer est importante." },
    { title: "Le temps consacré au nettoyage", text: "Chaque véhicule est nettoyé avec la même exigence : environ 2 heures pour une citadine, 2 h 30 pour une compacte ou un SUV compact, et 3 heures pour un grand véhicule." },
    { title: "Une prestation professionnelle", text: "Le tarif comprend le déplacement, un technicien formé à la méthode Laveoo, du matériel professionnel, des produits adaptés et une attention minutieuse portée à chaque détail." },
];

const pricingFaq = [
    { question: "Combien coûte un lavage auto à domicile avec Laveoo ?", answer: "Les tarifs sont de 79 € TTC pour une citadine, 99 € TTC pour une compacte, une berline ou un SUV compact, et 119 € TTC pour un SUV familial, un monospace ou un break. Le déplacement est inclus dans notre zone d'intervention." },
    { question: "Combien de temps dure la prestation ?", answer: "Comptez environ 2 heures pour une citadine, 2 h 30 pour une compacte, une berline ou un SUV compact, et 3 heures pour un grand SUV, un monospace ou un break." },
];

const breadcrumbItems = [
    { name: "Accueil", to: "/" },
    { name: "Tarifs", to: "/tarifs" },
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

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Nettoyage et lavage auto à domicile",
    serviceType: "Nettoyage automobile à domicile",
    description: "Lavage et nettoyage intérieur automobile à domicile en Essonne, Val-de-Marne et Seine-et-Marne, avec déplacement inclus.",
    url: "https://www.laveoo.com/tarifs",
    provider: {
        "@type": "AutoWash",
        name: companyInfo.name,
        telephone: companyInfo.phoneDisplay,
    },
    areaServed: ["Essonne", "Val-de-Marne", "Seine-et-Marne"],
    offers: siteData.pricing.items.map((item) => ({
        "@type": "Offer",
        name: item.shortLabel,
        price: item.price,
        priceCurrency: "EUR",
    })),
};

export default function PricingPage() {
    return (
        <>
            <Seo title="Nos tarifs de nettoyage et lavage auto" description="Tarifs Laveoo pour le lavage et nettoyage auto à domicile : 79 € pour les citadines, 99 € pour les compactes, berlines et SUV compacts, 119 € pour les grands SUV, monospaces et breaks. Déplacement inclus." path="/tarifs" jsonLd={[jsonLd, breadcrumbJsonLd]} />
            <Breadcrumbs items={breadcrumbItems} />
            <PageHero eyebrow="Des prix clairs, sans surprise" title="Nos tarifs de nettoyage et lavage auto" intro="Chez Laveoo, nous avons choisi une tarification simple et transparente pour votre lavage auto à domicile. Le déplacement est inclus dans notre zone d’intervention et le prix dépend uniquement de la catégorie de votre véhicule." />
            <section className="bg-[#F5F5F5] py-20 lg:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><PricingCards /></div></section>

            <section className="bg-white py-20 lg:py-24" aria-labelledby="transparent-title">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <h2 id="transparent-title" className="text-4xl font-black text-[#1F3A5F]">Des tarifs simples et transparents</h2>
                    <div className="mt-6 space-y-5 text-base leading-8 text-[#595959]">
                        <p>Nos tarifs sont annoncés avant chaque intervention. Ils dépendent de la taille du véhicule afin de tenir compte du temps nécessaire pour réaliser un nettoyage intérieur complet et soigné.</p>
                        <p>Pour les véhicules très encrassés ou les clients qui souhaitent une finition encore plus poussée, l’option d’une heure supplémentaire est proposée à 39 €. Notre objectif est d’offrir une prestation professionnelle, adaptée à vos besoins et réalisée directement à votre domicile.</p>
                    </div>
                    <h2 className="mt-14 text-3xl font-black text-[#1F3A5F]">Ce qui est inclus dans chaque prestation</h2>
                    <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                        {includedServices.map((item) => <li key={item} className="flex gap-3 rounded-2xl bg-[#F8FAFC] p-5 leading-7 text-[#595959]"><span className="font-black text-[#1769E8]">✓</span>{item}</li>)}
                    </ul>
                </div>
            </section>

            <section className="bg-[#F5F5F5] py-20 lg:py-24" aria-labelledby="calculation-title">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 id="calculation-title" className="text-center text-4xl font-black text-[#1F3A5F]">Comment nos tarifs sont calculés</h2>
                    <div className="mt-10 grid gap-6 lg:grid-cols-3">{calculations.map((item, index) => <article key={item.title} className="rounded-[1.75rem] border border-[#93B8D8]/55 bg-white p-7 shadow-[0_14px_40px_rgba(31,58,95,0.07)]"><span className="text-xs font-black text-[#1769E8]">{`0${index + 1}`}</span><h3 className="mt-4 text-2xl font-black text-[#1F3A5F]">{item.title}</h3><p className="mt-4 leading-8 text-[#595959]">{item.text}</p></article>)}</div>
                </div>
            </section>

            <section className="bg-white py-20 lg:py-24">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-2">
                        <div><h2 className="text-3xl font-black text-[#1F3A5F]">Pourquoi choisir Laveoo ?</h2><ul className="mt-6 space-y-3 text-[#595959]">{["Prestation à domicile ou sur votre lieu de travail", "Tarif clair et annoncé à l’avance", "Déplacement inclus dans notre secteur", "Nettoyage réalisé avec du matériel professionnel", "Produits adaptés aux différents matériaux", "Résultat soigné jusque dans les moindres détails"].map((item) => <li key={item} className="flex gap-3 leading-7"><span className="text-[#1769E8]">✓</span>{item}</li>)}</ul></div>
                        <div><h2 className="text-3xl font-black text-[#1F3A5F]">Déplacement inclus</h2><p className="mt-6 leading-8 text-[#595959]">Nous intervenons à domicile ou sur le lieu de travail dans le sud de l’Île-de-France, en Essonne (91), dans le Val-de-Marne (94) et en Seine-et-Marne (77). Si vous avez un doute sur votre commune, contactez-nous : nous vous répondrons rapidement.</p></div>
                    </div>
                    <SectionCta title="Réservez votre nettoyage intérieur" text="Choisissez la catégorie de votre véhicule, réservez en ligne et profitez d’un nettoyage professionnel sans vous déplacer." label="Réserver mon nettoyage" to="/reservation" />
                </div>
            </section>

            <section className="bg-[#F5F5F5] py-20 lg:py-24" aria-labelledby="tarifs-faq-title">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <h2 id="tarifs-faq-title" className="text-center text-4xl font-black text-[#1F3A5F]">Questions fréquentes sur nos tarifs</h2>
                    <div className="mt-10 grid gap-4">
                        {pricingFaq.map((item) => (
                            <details key={item.question} className="group rounded-[1.5rem] border border-[#93B8D8]/65 bg-white p-6 shadow-[0_12px_34px_rgba(31,58,95,0.06)]">
                                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-bold text-[#1F3A5F]"><span>{item.question}</span><span className="text-xl transition group-open:rotate-45">+</span></summary>
                                <p className="mt-4 border-t border-slate-100 pt-4 leading-8 text-[#595959]">{item.answer}</p>
                            </details>
                        ))}
                    </div>
                    <p className="mt-8 text-center text-sm text-[#595959]">
                        D'autres questions ? Consultez notre <Link to="/faq" className="font-bold text-[#1769E8] underline underline-offset-4">FAQ complète</Link>.
                    </p>
                </div>
            </section>
        </>
    );
}