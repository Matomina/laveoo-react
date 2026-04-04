import { siteData } from "../data/siteData";

const cardClass =
    "reveal-card group h-full rounded-[2rem] border border-white/70 bg-[#F8F8F8] p-8 text-center shadow-[0_12px_34px_rgba(31,58,95,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(31,58,95,0.12)] lg:p-10 lg:text-left";

const iconClass =
    "mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF2FB] text-2xl shadow-sm transition-transform duration-300 group-hover:scale-105 lg:mx-0";

export default function ContactSection() {
    const { brand, contact, businessHours, contactSection, cta } = siteData;

    const primaryCta = cta?.primary ?? {
        label: "Appeler maintenant",
        href: `tel:${contact?.phone ?? ""}`,
    };

    const mapQuery = encodeURIComponent(contact?.addressFull ?? "");
    const addressLines = [contact?.addressLine1, contact?.addressLine2].filter(Boolean);

    return (
        <section
            id="contact"
            aria-labelledby="contact-title"
            className="bg-white py-20 lg:py-24"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <header className="reveal-card mx-auto max-w-3xl text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#1F3A5F]">
                        Contact
                    </p>

                    <h2
                        id="contact-title"
                        className="mt-4 text-4xl font-black tracking-tight text-[#1F3A5F] sm:text-5xl"
                    >
                        {contactSection?.title ?? "Contactez-nous"}
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-[#595959]">
                        {contactSection?.intro ?? ""}
                    </p>

                    <p className="mt-4 text-sm font-medium text-[#1F3A5F]">
                        {contactSection?.infoNote ?? ""}
                    </p>
                </header>

                <div className="mt-14 grid gap-6 lg:grid-cols-3">
                    <article className={cardClass}>
                        <div className={iconClass} aria-hidden="true">
                            📍
                        </div>

                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1F3A5F]/60">
                            Localisation
                        </p>

                        <h3 className="mt-3 text-2xl font-bold text-[#1F3A5F]">
                            Adresse
                        </h3>

                        <address className="mt-4 not-italic text-base leading-8 text-[#595959]">
                            {addressLines.map((line) => (
                                <span key={line} className="block">
                                    {line}
                                </span>
                            ))}
                        </address>

                        <p className="mt-4 text-sm leading-7 text-[#595959]">
                            Intervention à domicile sur {contact?.serviceArea ?? ""}
                        </p>

                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex text-sm font-semibold text-[#1F3A5F] transition hover:opacity-80"
                            aria-label={`Ouvrir l’adresse de ${brand?.name ?? "LAVEOO"} dans Google Maps`}
                        >
                            Voir l’adresse sur la carte
                        </a>
                    </article>

                    <article className={cardClass}>
                        <div className={iconClass} aria-hidden="true">
                            📞
                        </div>

                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1F3A5F]/60">
                            Échange rapide
                        </p>

                        <h3 className="mt-3 text-2xl font-bold text-[#1F3A5F]">
                            Contact
                        </h3>

                        <ul className="mt-4 space-y-3 text-base text-[#595959]">
                            <li>
                                <a
                                    href={`tel:${contact?.phone ?? ""}`}
                                    className="font-medium transition hover:text-[#1F3A5F]"
                                    aria-label={`Appeler ${brand?.name ?? "LAVEOO"} au ${contact?.phoneDisplay ?? ""}`}
                                >
                                    {contact?.phoneDisplay ?? ""}
                                </a>
                            </li>

                            <li>
                                <a
                                    href={`mailto:${contact?.email ?? ""}`}
                                    className="break-all font-medium transition hover:text-[#1F3A5F]"
                                    aria-label={`Envoyer un email à ${brand?.name ?? "LAVEOO"}`}
                                >
                                    {contact?.email ?? ""}
                                </a>
                            </li>
                        </ul>

                        <a
                            href={primaryCta.href}
                            className="mx-auto mt-8 inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#1F3A5F] px-6 py-3 text-center text-sm font-semibold text-white shadow-[0_12px_30px_rgba(31,58,95,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(31,58,95,0.24)] lg:mx-0"
                            aria-label={`${primaryCta.label} ${brand?.name ?? "LAVEOO"}`}
                        >
                            {primaryCta.label}
                        </a>
                    </article>

                    <article className={cardClass}>
                        <div className={iconClass} aria-hidden="true">
                            🕒
                        </div>

                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1F3A5F]/60">
                            Disponibilité
                        </p>

                        <h3 className="mt-3 text-2xl font-bold text-[#1F3A5F]">
                            {businessHours?.title ?? "Horaires d’intervention"}
                        </h3>

                        <p className="mt-4 text-base leading-8 text-[#595959]">
                            {businessHours?.display ?? "7j/7 de 8h à 21h"}
                        </p>

                        <p className="mt-6 text-sm leading-7 text-[#595959]">
                            {businessHours?.duration ?? "Temps de prestation : 2h"}
                        </p>
                    </article>
                </div>

                <div className="reveal-card mt-10 rounded-[2rem] bg-[#F5F5F5] p-4 shadow-[0_12px_34px_rgba(31,58,95,0.08)] transition-all duration-300 hover:shadow-[0_20px_44px_rgba(31,58,95,0.12)] sm:p-6">
                    <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
                        <iframe
                            title={`Carte Google Maps de ${brand?.name ?? "LAVEOO"}`}
                            src={contact?.mapEmbedUrl ?? ""}
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