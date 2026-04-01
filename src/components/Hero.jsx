import heroImage from "../assets/hero-laveoo.jpg";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-[#EAF2FB]">
            {/* Fond doux */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(234,242,251,1)_0%,rgba(245,245,245,1)_100%)]" />

            <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                <div className="grid items-center gap-10 lg:grid-cols-2">
                    {/* Colonne texte */}
                    <div className="text-center lg:text-left">
                        <div className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1F3A5F] shadow-sm">
                            Service professionnel à domicile
                        </div>

                        <h1 className="mt-6 text-4xl font-black leading-tight text-[#1F3A5F] sm:text-5xl lg:text-6xl">
                            Nettoyage de voiture à domicile
                        </h1>

                        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[#595959] lg:mx-0 sm:text-lg">
                            LAVEOO société basée à Yerres propose un service de nettoyage intérieur de véhicules à
                            domicile, avec une intervention professionnelle, pratique et
                            soignée, directement chez vous.
                        </p>

                        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                            <a
                                href="tel:0123456789"
                                className="inline-flex rounded-full bg-[#1F3A5F] px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
                            >
                                Appeler maintenant
                            </a>

                            <a
                                href="#offre"
                                className="inline-flex rounded-full border border-[#1F3A5F] px-8 py-4 text-base font-semibold text-[#1F3A5F] transition hover:bg-white"
                            >
                                Voir l’offre
                            </a>
                        </div>

                        <div className="mt-8 flex flex-col gap-3 text-sm text-[#595959] sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
                            <span className="rounded-full bg-white px-4 py-2 shadow-sm">
                                Déplacement à domicile
                            </span>
                            <span className="rounded-full bg-white px-4 py-2 shadow-sm">
                                Matériel professionnel
                            </span>
                            <span className="rounded-full bg-white px-4 py-2 shadow-sm">
                                Intervention sur rendez-vous
                            </span>
                        </div>
                    </div>

                    {/* Colonne visuelle */}
                    <div className="flex justify-center">
                        <div className="w-full max-w-xl rounded-[2rem] bg-white p-5 shadow-[0_20px_60px_rgba(31,58,95,0.12)] sm:p-6">
                            <div className="overflow-hidden rounded-[1.5rem]">
                                <img
                                    src={heroImage}
                                    alt="Nettoyage intérieur de voiture"
                                    className="h-[260px] w-full object-cover sm:h-[320px] lg:h-[360px]"
                                />
                            </div>

                            <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                <div className="rounded-[1.5rem] bg-[#F5F5F5] p-5">
                                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1F3A5F]">
                                        Offre actuelle
                                    </p>
                                    <p className="mt-3 text-4xl font-black text-[#1F3A5F]">69€</p>
                                    <p className="mt-2 text-sm leading-7 text-[#595959]">
                                        Nettoyage intérieur professionnel avec déplacement à
                                        domicile inclus.
                                    </p>
                                </div>

                                <div className="rounded-[1.5rem] bg-[#EAF2FB] p-5">
                                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1F3A5F]">
                                        Ce qui est inclus
                                    </p>
                                    <ul className="mt-3 space-y-2 text-sm leading-7 text-[#595959]">
                                        <li>• Aspiration en profondeur</li>
                                        <li>• Désinfection des plastiques</li>
                                        <li>• Détachage sièges et moquette</li>
                                        <li>• Élimination des odeurs</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}