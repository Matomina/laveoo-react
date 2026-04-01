export default function ContactSection() {
    return (
        <section id="contact" className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Titre de section */}
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#1F3A5F]">
                        Contact
                    </p>
                    <h2 className="mt-4 text-4xl font-black text-[#1F3A5F] sm:text-5xl">
                        Nous contacter
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-[#595959]">
                        Besoin d’un nettoyage intérieur à domicile ? Contactez LAVEOO pour
                        fixer votre rendez-vous rapidement.
                    </p>
                </div>

                {/* Bloc principal */}
                <div className="mt-14 grid gap-6 lg:grid-cols-3">
                    {/* Adresse */}
                    <div className="rounded-[2rem] bg-[#F5F5F5] p-8 shadow-sm">
                        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF2FB] text-2xl">
                            📍
                        </div>
                        <h3 className="text-2xl font-bold text-[#1F3A5F]">Adresse</h3>
                        <p className="mt-4 text-base leading-8 text-[#595959]">
                            85 rue Pierre Brossolette
                            <br />
                            91330 YERRES
                        </p>
                        <p className="mt-4 text-sm leading-7 text-[#595959]">
                            Intervention à domicile sur Yerres, Montgeron, Crosne, Brunoy et les alentours.
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="rounded-[2rem] bg-[#F5F5F5] p-8 shadow-sm">
                        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF2FB] text-2xl">
                            📞
                        </div>
                        <h3 className="text-2xl font-bold text-[#1F3A5F]">Contact</h3>

                        <div className="mt-4 space-y-3 text-base text-[#595959]">
                            <p>
                                <a
                                    href="tel:0123456789"
                                    className="font-medium transition hover:text-[#1F3A5F]"
                                >
                                    01 23 45 67 89
                                </a>
                            </p>

                            <p>
                                <a
                                    href="mailto:info@monsite.fr"
                                    className="font-medium transition hover:text-[#1F3A5F]"
                                >
                                    info@monsite.fr
                                </a>
                            </p>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <a
                                href="#"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg shadow-sm transition hover:-translate-y-0.5"
                                aria-label="Facebook"
                            >
                                f
                            </a>
                            <a
                                href="#"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg shadow-sm transition hover:-translate-y-0.5"
                                aria-label="Twitter"
                            >
                                t
                            </a>
                            <a
                                href="#"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg shadow-sm transition hover:-translate-y-0.5"
                                aria-label="LinkedIn"
                            >
                                in
                            </a>
                            <a
                                href="#"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg shadow-sm transition hover:-translate-y-0.5"
                                aria-label="Instagram"
                            >
                                ig
                            </a>
                        </div>

                        <a
                            href="tel:0123456789"
                            className="mt-8 inline-flex rounded-full bg-[#1F3A5F] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                        >
                            Appeler maintenant
                        </a>
                    </div>

                    {/* Horaires */}
                    <div className="rounded-[2rem] bg-[#F5F5F5] p-8 shadow-sm">
                        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF2FB] text-2xl">
                            🕒
                        </div>
                        <h3 className="text-2xl font-bold text-[#1F3A5F]">
                            Heures d’ouverture
                        </h3>

                        <div className="mt-4 space-y-4 text-base text-[#595959]">
                            <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
                                <span>Lun. - Ven.</span>
                                <span className="font-medium">8h - 20h</span>
                            </div>

                            <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
                                <span>Samedi</span>
                                <span className="font-medium">9h - 19h</span>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <span>Dimanche</span>
                                <span className="font-medium">9h - 21h</span>
                            </div>
                        </div>

                        <p className="mt-6 text-sm leading-7 text-[#595959]">
                            Disponible sur rendez-vous selon les créneaux restants.
                        </p>
                    </div>
                </div>

                {/* Carte */}
                <div className="mt-10 rounded-[2rem] bg-[#F5F5F5] p-4 shadow-sm sm:p-6">
                    <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
                        <iframe
                            title="Carte LAVEOO"
                            src="https://www.google.com/maps?q=85%20rue%20Pierre%20Brossolette%2091330%20Yerres&z=14&output=embed"
                            className="h-[420px] w-full border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}