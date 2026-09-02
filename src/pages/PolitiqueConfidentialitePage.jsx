import Seo from "../components/Seo";
import PageHero from "../components/PageHero";

export default function PolitiqueConfidentialitePage() {
    return (
        <>
            <Seo title="Politique de confidentialité" description="Politique de confidentialité et protection des données personnelles du site Laveoo." path="/politique-de-confidentialite" />
            <PageHero eyebrow="Protection des données" title="Politique de confidentialité" />
            <section className="bg-[#F5F5F5] py-16 lg:py-20">
                <div className="mx-auto max-w-3xl space-y-8 px-4 text-sm leading-7 text-[#595959] sm:px-6 lg:px-8">
                    <div>
                        <h2 className="text-lg font-black text-[#1F3A5F]">Responsable du traitement</h2>
                        <p className="mt-2">
                            Laveoo, micro-entreprise (SIRET 844 000 141 00029), 1 place de la Résidence, 94310 Orly,
                            joignable à laveoocontact@gmail.com, est responsable du traitement des données personnelles
                            collectées sur ce site.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-black text-[#1F3A5F]">Données collectées</h2>
                        <p className="mt-2">
                            Lorsque vous utilisez le formulaire de réservation, nous collectons : votre nom, votre adresse
                            postale, votre adresse e-mail, votre numéro de téléphone, et, si vous êtes un professionnel,
                            votre numéro de SIRET.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-black text-[#1F3A5F]">Finalité du traitement</h2>
                        <p className="mt-2">
                            Ces données sont utilisées exclusivement pour traiter votre demande de réservation, organiser
                            l'intervention (déplacement à votre adresse, prise de contact), et établir la facture
                            correspondant à la prestation réalisée.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-black text-[#1F3A5F]">Destinataires des données</h2>
                        <p className="mt-2">
                            Vos données sont uniquement accessibles par Laveoo. Elles sont stockées via Supabase (hébergement
                            de base de données) et transitent, pour l'envoi de vos factures, par Resend (service d'envoi
                            d'e-mails). Aucune donnée n'est vendue ni transmise à des tiers à des fins commerciales.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-black text-[#1F3A5F]">Durée de conservation</h2>
                        <p className="mt-2">
                            Vos données sont conservées pendant la durée nécessaire au traitement de votre demande, et,
                            pour les factures, pendant la durée légale de conservation des documents comptables (10 ans).
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-black text-[#1F3A5F]">Vos droits</h2>
                        <p className="mt-2">
                            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un
                            droit d'accès, de rectification, d'effacement et de portabilité de vos données. Vous pouvez
                            exercer ces droits en nous contactant à laveoocontact@gmail.com.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-black text-[#1F3A5F]">Cookies et mesure d'audience</h2>
                        <p className="mt-2">
                            Ce site utilise Google Analytics afin de mesurer la fréquentation et comprendre l'usage qui
                            en est fait (pages visitées, provenance des visiteurs). Ces données sont anonymisées et ne
                            permettent pas de vous identifier personnellement. Vous pouvez vous opposer à ce suivi en
                            configurant votre navigateur pour bloquer les cookies, ou via un module de blocage dédié
                            (par exemple{" "}
                            <a
                                href="https://tools.google.com/dlpage/gaoptout"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="premium-link text-[#1769E8]"
                            >
                                le module de désactivation de Google Analytics
                            </a>
                            ). Ce site n'utilise aucun cookie publicitaire.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
