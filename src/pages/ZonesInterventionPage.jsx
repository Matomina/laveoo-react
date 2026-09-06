import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import SectionCta from "../components/SectionCta";
import { villes } from "../data/villes";

const DEPARTEMENTS = [
    { code: "91", nom: "Essonne", slug: "essonne" },
    { code: "94", nom: "Val-de-Marne", slug: "val-de-marne" },
    { code: "77", nom: "Seine-et-Marne", slug: "seine-et-marne" },
];

export default function ZonesInterventionPage() {
    return (
        <>
            <Seo
                title="Nos zones d'intervention"
                description="Laveoo intervient dans le sud de l'Île-de-France : Essonne (91), Val-de-Marne (94) et Seine-et-Marne (77). Retrouvez toutes les villes desservies pour le nettoyage automobile à domicile."
                path="/nos-zones-d-intervention"
            />
            <PageHero
                eyebrow="Où intervenons-nous ?"
                title="Nos zones d'intervention"
                intro="Laveoo se déplace dans le sud de l'Île-de-France, en Essonne, dans le Val-de-Marne et en Seine-et-Marne, avec déplacement inclus et sans surcoût dans notre zone de couverture."
            />

            <section className="bg-[#F5F5F5] py-16 lg:py-20">
                <div className="mx-auto max-w-5xl space-y-10 px-4 sm:px-6 lg:px-8">
                    {DEPARTEMENTS.map((departement) => {
                        const villesDuDepartement = villes.filter((v) => v.departement === departement.code);
                        if (villesDuDepartement.length === 0) return null;

                        return (
                            <div key={departement.code} className="reveal-card rounded-[2rem] border border-[#93B8D8]/50 bg-white p-6 shadow-[0_14px_40px_rgba(31,58,95,0.06)] sm:p-8">
                                <Link
                                    to={`/nettoyage-auto-${departement.slug}`}
                                    className="text-xs font-black uppercase tracking-[0.22em] text-[#1F3A5F]/60 hover:text-[#1769E8]"
                                >
                                    {departement.nom} ({departement.code}) →
                                </Link>
                                <div className="mt-5 flex flex-wrap gap-3">
                                    {villesDuDepartement.map((ville) => (
                                        <Link
                                            key={ville.slug}
                                            to={`/nettoyage-auto/${ville.slug}`}
                                            className="rounded-full bg-[#F8FAFC] px-5 py-2.5 text-sm font-bold text-[#1769E8] shadow-sm transition hover:bg-[#EAF2FB] hover:shadow-md"
                                        >
                                            Nettoyage auto à {ville.nom}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    <p className="reveal-card text-center text-sm text-[#595959]">
                        Vous ne trouvez pas votre ville dans la liste ? Contactez-nous, nous intervenons peut-être déjà près de chez vous.
                    </p>

                    <SectionCta
                        title="Prêt à réserver votre créneau ?"
                        text="Choisissez votre forfait et réservez en ligne en quelques clics, paiement uniquement après la prestation."
                        label="Réserver en ligne"
                        to="/reservation"
                        secondaryLabel="Nous contacter"
                        secondaryTo="/contact"
                    />
                </div>
            </section>
        </>
    );
}
