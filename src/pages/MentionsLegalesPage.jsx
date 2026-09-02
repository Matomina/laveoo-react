import Seo from "../components/Seo";
import PageHero from "../components/PageHero";

export default function MentionsLegalesPage() {
    return (
        <>
            <Seo title="Mentions légales" description="Mentions légales du site Laveoo." path="/mentions-legales" />
            <PageHero eyebrow="Informations légales" title="Mentions légales" />
            <section className="bg-[#F5F5F5] py-16 lg:py-20">
                <div className="mx-auto max-w-3xl space-y-8 px-4 text-sm leading-7 text-[#595959] sm:px-6 lg:px-8">
                    <div>
                        <h2 className="text-lg font-black text-[#1F3A5F]">Éditeur du site</h2>
                        <p className="mt-2">
                            Laveoo — Micro-entreprise<br />
                            SIRET : 844 000 141 00029<br />
                            Adresse : 1 place de la Résidence, 94310 Orly<br />
                            Téléphone : 06 07 11 22 79<br />
                            E-mail : laveoocontact@gmail.com<br />
                            TVA non applicable, art. 293 B du Code Général des Impôts.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-black text-[#1F3A5F]">Directeur de la publication</h2>
                        <p className="mt-2">Le représentant de Laveoo.</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-black text-[#1F3A5F]">Hébergement</h2>
                        <p className="mt-2">
                            Vercel Inc.<br />
                            340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis<br />
                            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="premium-link text-[#1769E8]">vercel.com</a>
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-black text-[#1F3A5F]">Propriété intellectuelle</h2>
                        <p className="mt-2">
                            L'ensemble des éléments présents sur ce site (textes, images, logo) sont la propriété de Laveoo,
                            sauf mention contraire, et ne peuvent être reproduits sans autorisation préalable.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-black text-[#1F3A5F]">Données personnelles</h2>
                        <p className="mt-2">
                            Les informations recueillies via le formulaire de réservation font l'objet d'un traitement
                            décrit dans notre{" "}
                            <a href="/politique-de-confidentialite" className="premium-link text-[#1769E8]">
                                politique de confidentialité
                            </a>.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
