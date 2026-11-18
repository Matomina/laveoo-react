import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import VideoSection from "../components/VideoSection";
import SectionCta from "../components/SectionCta";
import Breadcrumbs from "../components/Breadcrumbs";
import { companyInfo } from "../data/companyInfo";
import { guidesTaches } from "../data/guidesTaches";
import { departements } from "../data/departements";

const faqGenerale = [
    {
        question: "Quels véhicules pouvez-vous nettoyer à domicile ?",
        reponse: "Tous les types de véhicules : citadines, compactes, berlines, SUV, monospaces et breaks. Le tarif dépend uniquement de la catégorie du véhicule, pas du nombre de taches ou de l'état général.",
    },
    {
        question: "Dans quelles situations faire appel à un nettoyage à domicile ?",
        reponse: "Après un long trajet, l'achat d'un véhicule d'occasion, le transport répété d'enfants ou d'animaux, ou simplement pour un entretien régulier qui préserve la valeur du véhicule à la revente.",
    },
    {
        question: "Pourquoi choisir un professionnel plutôt que nettoyer soi-même ?",
        reponse: "Les poussières incrustées, les taches anciennes, les poils d'animaux ou certaines odeurs nécessitent un matériel d'injection-extraction que ne possède pas un particulier. Le résultat est plus profond et plus durable qu'un nettoyage maison.",
    },
    {
        question: "Faut-il que je sois présent pendant l'intervention ?",
        reponse: "Non, ce n'est pas obligatoire. Beaucoup de clients nous laissent les clés et continuent leurs activités pendant que nous nettoyons le véhicule, que ce soit à domicile ou sur le lieu de travail.",
    },
];

export default function NettoyageAutoDomicilePage() {
    const path = "/nettoyage-auto-domicile";
    const title = "Nettoyage auto à domicile";
    const description = "Nettoyage intérieur automobile professionnel à domicile dans le sud de l'Île-de-France. Tous véhicules, déplacement inclus, forfaits dès 79 €.";

    const breadcrumbItems = [
        { name: "Accueil", to: "/" },
        { name: title, to: path },
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
            "@type": "Service",
            name: title,
            serviceType: title,
            description,
            url: `https://www.laveoo.com${path}`,
            provider: {
                "@type": "AutoWash",
                name: companyInfo.name,
                telephone: companyInfo.phoneDisplay,
                address: { "@type": "PostalAddress", streetAddress: companyInfo.streetAddress, addressLocality: companyInfo.addressLocality, postalCode: companyInfo.postalCode, addressCountry: "FR" },
            },
            areaServed: ["Essonne", "Val-de-Marne", "Seine-et-Marne"],
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqGenerale.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.reponse },
            })),
        },
    ];

    return (
        <>
            <Seo title={title} description={description} path={path} jsonLd={jsonLd} />
            <Breadcrumbs items={breadcrumbItems} />
            <PageHero
                eyebrow="Service mobile"
                title={title}
                intro="Laveoo intervient directement à votre domicile ou sur votre lieu de travail pour un nettoyage intérieur complet, avec du matériel et des produits professionnels — sans que vous ayez à vous déplacer."
            />

            <section className="bg-white py-16 lg:py-20">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <h2 className="reveal-card text-2xl font-black text-[#1F3A5F] sm:text-3xl">Comment se passe l'intervention</h2>
                    <p className="reveal-card mt-5 leading-8 text-[#595959]">
                        Aspiration complète de l'habitacle et du coffre, shampoing des sièges, nettoyage des moquettes, des tapis, des plastiques et des vitres : chaque intervention suit le même protocole rigoureux, avec du matériel d'injection-extraction professionnel.
                        {" "}
                        <Link to="/nos-methodes-de-nettoyage" className="font-semibold text-[#1769E8] underline">Découvrez notre protocole complet</Link>.
                    </p>
                    <p className="reveal-card mt-4 leading-8 text-[#595959]">
                        Sièges en tissu, en cuir ou en Alcantara, tableau de bord, console centrale, seuils de porte et contre-portes : chaque matière reçoit un produit adapté, pour un résultat propre qui respecte l'aspect d'origine du véhicule.
                    </p>
                </div>
            </section>

            <VideoSection />

            <div className="reveal-card -mt-8 flex justify-center pb-16 lg:pb-20">
                <Link to="/reservation" className="premium-button inline-flex min-h-12 items-center justify-center rounded-full bg-[#1F3A5F] px-8 py-3 font-semibold text-white shadow-[0_12px_28px_rgba(31,58,95,0.18)]">
                    Réserver mon nettoyage
                </Link>
            </div>

            <section className="bg-[#F5F5F5] py-16 lg:py-20">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <h2 className="reveal-card text-2xl font-black text-[#1F3A5F] sm:text-3xl">Tous les véhicules, toutes les salissures</h2>
                    <p className="reveal-card mt-5 leading-8 text-[#595959]">
                        Les citadines et compactes, utilisées quotidiennement, accumulent vite miettes, poussière et traces de chaussures. Les berlines et SUV, avec un habitacle plus spacieux, demandent un nettoyage minutieux des sièges, de la moquette et du coffre. Les monospaces, souvent exposés aux boissons renversées et aux miettes de plusieurs passagers, et les breaks, dont le grand coffre sert aux courses, bagages ou poussettes, bénéficient du même niveau de soin que les autres véhicules.
                    </p>
                    <p className="reveal-card mt-4 leading-8 text-[#595959]">
                        Du simple dépoussiérage au traitement d'une salissure installée depuis des semaines, chaque intervention s'adapte à l'état réel du véhicule plutôt qu'à un forfait générique. Pour le détail des matières et des taches traitées sur les sièges, consultez notre page{" "}
                        <Link to="/nettoyage-sieges-voiture" className="font-semibold text-[#1769E8] underline">nettoyage des sièges</Link>.
                    </p>

                    <div className="mt-10 grid gap-6 sm:grid-cols-2">
                        <div className="reveal-card">
                            <BeforeAfterSlider
                                before="/results/nettoyage-console-centrale-automobile-avant.webp"
                                after="/results/nettoyage-console-centrale-automobile-apres.webp"
                                alt="Avant-après du nettoyage d'une console centrale automobile"
                                title="Plastiques et console centrale"
                            />
                        </div>
                        <div className="reveal-card">
                            <BeforeAfterSlider
                                before="/results/nettoyage-sol-moquette-voiture-avant.webp"
                                after="/results/nettoyage-sol-moquette-voiture-apres.webp"
                                alt="Avant-après du nettoyage du sol et de la moquette d'une voiture"
                                title="Sol et moquette"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-16 lg:py-20">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <h2 className="reveal-card text-2xl font-black text-[#1F3A5F] sm:text-3xl">Dans quelles situations faire nettoyer sa voiture ?</h2>
                    <p className="reveal-card mt-5 leading-8 text-[#595959]">
                        Après un long trajet, l'habitacle accumule poussière, miettes et parfois du sable ou des emballages alimentaires. Après l'achat d'un véhicule d'occasion, un nettoyage complet permet de repartir sur une base saine, même lorsque l'intérieur semble propre à première vue. Le transport régulier d'enfants ou d'animaux use aussi vite un habitacle : miettes, chewing-gums, boissons renversées d'un côté, poils incrustés et traces de pattes de l'autre.
                    </p>
                    <p className="reveal-card mt-4 leading-8 text-[#595959]">
                        Même sans tache visible, un entretien régulier reste utile : il évite que la poussière ne s'incruste dans les tissus et préserve mieux la valeur du véhicule au moment de la revente.
                    </p>
                </div>
            </section>

            <section className="bg-[#F5F5F5] py-16 lg:py-20">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <h2 className="reveal-card text-2xl font-black text-[#1F3A5F] sm:text-3xl">Pourquoi choisir un professionnel plutôt que de nettoyer soi-même ?</h2>
                    <p className="reveal-card mt-5 leading-8 text-[#595959]">
                        Un entretien courant à l'aspirateur reste utile, mais les poussières incrustées, les taches anciennes, les poils d'animaux ou certaines odeurs tenaces résistent aux produits grand public. Notre matériel d'injection-extraction professionnel va chercher la saleté en profondeur, là où un nettoyage maison s'arrête en surface — pour un résultat plus net et plus durable, sans y passer votre après-midi.
                    </p>
                </div>
            </section>

            <section className="bg-white py-16 lg:py-20">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <h2 className="reveal-card text-2xl font-black text-[#1F3A5F] sm:text-3xl">Nos guides pratiques</h2>
                    <p className="reveal-card mt-4 leading-7 text-[#595959]">Une tache ou un problème précis ? Consultez nos guides étape par étape avant de faire appel à un professionnel :</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {guidesTaches.map((g) => (
                            <Link
                                key={g.slug}
                                to={`/comment-nettoyer/${g.slug}`}
                                className="reveal-card rounded-2xl border border-[#93B8D8]/50 bg-[#F8FAFC] px-5 py-4 font-semibold text-[#1F3A5F] transition hover:border-[#1769E8] hover:bg-white"
                            >
                                {g.h1}
                            </Link>
                        ))}
                        <Link
                            to="/comment-nettoyer"
                            className="reveal-card flex items-center justify-center rounded-2xl border border-[#1F3A5F]/15 bg-white px-5 py-4 font-bold text-[#1769E8] transition hover:border-[#1769E8]"
                        >
                            Voir tous nos guides →
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-[#EAF2FB] py-16 lg:py-20">
                <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="reveal-card text-2xl font-black text-[#1F3A5F] sm:text-3xl">Tarifs</h2>
                    <p className="reveal-card mx-auto mt-5 max-w-2xl leading-8 text-[#595959]">
                        <strong>79 €</strong> pour une citadine, <strong>99 €</strong> pour une compacte, une berline ou un SUV compact, <strong>119 €</strong> pour un grand SUV, un monospace ou un break. Déplacement inclus, paiement uniquement une fois la prestation terminée.
                    </p>
                    <Link to="/tarifs" className="premium-button mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#1F3A5F] px-8 py-3 font-semibold text-white">Voir le détail des forfaits</Link>
                </div>
            </section>

            <section className="bg-white py-16 lg:py-20">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <h2 className="reveal-card text-2xl font-black text-[#1F3A5F] sm:text-3xl">Notre zone d'intervention</h2>
                    <p className="reveal-card mt-4 leading-7 text-[#595959]">
                        Laveoo se déplace à domicile ou sur votre lieu de travail dans tout le sud de l'Île-de-France, déplacement inclus :
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        {departements.map((d) => (
                            <Link
                                key={d.slug}
                                to={`/nettoyage-auto-${d.slug}`}
                                className="reveal-card rounded-full bg-[#1F3A5F] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#102A59]"
                            >
                                {`${d.nom} (${d.code})`}
                            </Link>
                        ))}
                    </div>
                    <p className="reveal-card mt-5 text-sm text-[#595959]">
                        Retrouvez la liste complète des villes desservies sur notre <Link to="/nos-zones-d-intervention" className="font-semibold text-[#1769E8] underline">page zones d'intervention</Link>.
                    </p>
                </div>
            </section>

            <section className="bg-[#F5F5F5] py-16 lg:py-20">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="reveal-card flex flex-wrap items-baseline justify-between gap-3">
                        <h2 className="text-2xl font-black text-[#1F3A5F] sm:text-3xl">Questions fréquentes</h2>
                        <Link to="/faq" className="text-sm font-semibold text-[#1769E8] underline">Voir toute la FAQ</Link>
                    </div>
                    <div className="mt-6 grid gap-4">
                        {faqGenerale.map((item) => (
                            <details key={item.question} className="reveal-card group rounded-[1.5rem] border border-[#93B8D8]/70 bg-white p-5 shadow-[0_12px_34px_rgba(31,58,95,0.06)]">
                                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-bold leading-7 text-[#1F3A5F]">
                                    <span>{item.question}</span>
                                    <span aria-hidden="true" className="mt-0.5 text-xl transition group-open:rotate-45">+</span>
                                </summary>
                                <p className="mt-4 border-t border-slate-100 pt-4 leading-8 text-[#595959]">{item.reponse}</p>
                            </details>
                        ))}
                    </div>

                    <SectionCta
                        title="Prêt à retrouver un habitacle impeccable ?"
                        text="Laveoo intervient à domicile dans le sud de l'Île-de-France, pour tous les véhicules, avec déplacement inclus."
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
