import { siteData } from "../data/siteData";

const cardClass =
    "reveal-card premium-card group h-full rounded-[2rem] border border-[#22D3EE] bg-white p-8 text-center shadow-[0_12px_34px_rgba(31,58,95,0.08)] lg:p-10 lg:text-left";

const iconClass =
    "mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF2FB] text-2xl font-black text-[#1F3A5F] shadow-sm transition-transform duration-300 group-hover:scale-105 lg:mx-0";

const actionClassByVariant = {
    primary:
        "premium-button bg-[#1F3A5F] text-white shadow-[0_14px_34px_rgba(31,58,95,0.18)] hover:shadow-[0_24px_52px_rgba(31,58,95,0.28)]",
    secondary:
        "premium-button border border-[#1F3A5F]/12 bg-white text-[#1F3A5F] shadow-[0_10px_24px_rgba(31,58,95,0.08)] hover:bg-white hover:shadow-[0_20px_40px_rgba(31,58,95,0.16)]",
    ghost:
        "premium-button border border-[#1F3A5F]/18 bg-[#EAF2FB] text-[#1F3A5F] shadow-[0_10px_24px_rgba(31,58,95,0.06)] hover:shadow-[0_18px_38px_rgba(31,58,95,0.12)]",
};

export default function ContactSection() {
    const { brand, contact, businessHours, contactSection } = siteData;
    const mapQuery = encodeURIComponent(contact?.mapQuery ?? "Yerres 91330");

    return (
        <section
            id="contact"
            aria-labelledby="contact-title"
            className="bg-white py-20 lg:py-24"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <header className="reveal-card mx-auto max-w-3xl text-center">
                    <h2
                        id="contact-title"
                        className="text-4xl font-black tracking-tight text-[#1F3A5F] sm:text-5xl"
                    >
                        {contactSection?.title ?? "Réserver maintenant"}
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-[#595959]">
                        {contactSection?.intro}
                    </p>

                    <p className="mt-4 text-sm font-medium text-[#1F3A5F]">
                        {contactSection?.infoNote}
                    </p>

                    <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
                        {(contactSection?.actions ?? []).map((action) => (
                            <a
                                key={action.label}
                                href={action.href}
                                target={action.external ? "_blank" : undefined}
                                rel={action.external ? "noopener noreferrer" : undefined}
                                className={`inline-flex min-h-[58px] items-center justify-center rounded-full px-8 py-4 text-center text-base font-semibold transition duration-300 ${actionClassByVariant[action.variant] ?? actionClassByVariant.secondary}`}
                            >
                                {action.label}
                            </a>
                        ))}
                    </div>
                </header>

                <div className="mt-14 grid gap-6 lg:grid-cols-3">
                    <article className={cardClass}>
                        <div className={iconClass} aria-hidden="true">
                            01
                        </div>

                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1F3A5F]/60">
                            Zone desservie
                        </p>

                        <h3 className="mt-3 text-2xl font-bold text-[#1F3A5F]">
                            Intervention à domicile
                        </h3>

                        <p className="mt-4 text-base leading-8 text-[#595959]">
                            {contact?.serviceArea}
                        </p>

                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="premium-link mt-6 inline-flex text-sm font-semibold text-[#1F3A5F] transition hover:opacity-80"
                            aria-label={`Ouvrir la zone d'intervention de ${brand?.name ?? "LAVEOO"} dans Google Maps`}
                        >
                            Voir la zone d'intervention
                        </a>
                    </article>

                    <article className={cardClass}>
                        <div className={iconClass} aria-hidden="true">
                            02
                        </div>

                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1F3A5F]/60">
                            Contact direct
                        </p>

                        <h3 className="mt-3 text-2xl font-bold text-[#1F3A5F]">
                            Téléphone et WhatsApp
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
                                    href={`https://wa.me/${contact?.whatsapp ?? ""}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium transition hover:text-[#1F3A5F]"
                                    aria-label={`Contacter ${brand?.name ?? "LAVEOO"} sur WhatsApp`}
                                >
                                    WhatsApp
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
                    </article>

                    <article className={cardClass}>
                        <div className={iconClass} aria-hidden="true">
                            03
                        </div>

                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1F3A5F]/60">
                            Disponibilité
                        </p>

                        <h3 className="mt-3 text-2xl font-bold text-[#1F3A5F]">
                            {businessHours?.title ?? "Horaires d'intervention"}
                        </h3>

                        <p className="mt-4 text-base leading-8 text-[#595959]">
                            {businessHours?.display ?? "7j/7 de 8h à 21h"}
                        </p>

                        <p className="mt-6 text-sm leading-7 text-[#595959]">
                            {businessHours?.duration ?? "Temps de prestation : 2h"}
                        </p>
                    </article>
                </div>

                <div className="reveal-card premium-card mt-10 rounded-[2rem] bg-[#F5F5F5] p-4 shadow-[0_12px_34px_rgba(31,58,95,0.08)] sm:p-6">
                    <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
                        <iframe
                            title={`Zone d'intervention Google Maps de ${brand?.name ?? "LAVEOO"}`}
                            src={contact?.mapEmbedUrl ?? ""}
                            className="min-h-[420px] w-full border-0"
                            loading="eager"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                        />
                    </div>

                    <div className="mt-4 flex flex-col gap-3 px-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                        <p className="text-sm leading-7 text-[#595959]">
                            Si la carte ne se charge pas sur votre appareil, vous pouvez ouvrir directement la zone d’intervention dans Google Maps.
                        </p>

                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="premium-button inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#1F3A5F]/12 bg-white px-5 py-3 text-sm font-semibold text-[#1F3A5F] shadow-[0_10px_24px_rgba(31,58,95,0.08)]"
                        >
                            Ouvrir la carte
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
