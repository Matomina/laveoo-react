import heroImage from "../assets/hero-laveoo.jpg";
import { siteData } from "../data/siteData";

export default function PricingSection() {
    const { pricing, included } = siteData;

    return (
        <section
            id="tarifs"
            className="bg-[#F5F5F5] py-20 lg:py-24"
            aria-labelledby="pricing-title"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="reveal-card mx-auto max-w-3xl text-center">
                    <h2
                        id="pricing-title"
                        className="text-4xl font-black tracking-tight text-[#1F3A5F] sm:text-5xl"
                    >
                        {pricing?.title ?? "Tarifs"}
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-[#595959]">
                        {pricing?.intro}
                    </p>
                </div>

                <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:items-stretch">
                    {(pricing?.items ?? []).map((item) => (
                        <article
                            key={item.id}
                            className="reveal-card premium-card group flex h-full flex-col rounded-[2rem] border border-[#22D3EE] bg-white p-5 shadow-[0_24px_70px_rgba(31,58,95,0.14)] sm:p-6"
                        >
                            <div className="overflow-hidden rounded-[1.5rem]">
                                {item.media?.type === "video" ? (
                                    <video
                                        className="premium-media h-[230px] w-full object-cover sm:h-[260px]"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="metadata"
                                        aria-label={item.media.label ?? item.label}
                                    >
                                        <source src={item.media.src} type="video/mp4" />
                                        Votre navigateur ne prend pas en charge la lecture vidéo.
                                    </video>
                                ) : (
                                    <img
                                        src={heroImage}
                                        alt={item.media?.alt ?? item.label}
                                        className="premium-media h-[230px] w-full object-cover sm:h-[260px]"
                                    />
                                )}
                            </div>

                            <div className="mt-5 flex flex-1 flex-col gap-4">
                                <div className="rounded-[1.5rem] bg-[#F8FAFC] p-5 shadow-[0_10px_30px_rgba(31,58,95,0.06)] transition duration-500 group-hover:bg-white">
                                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1F3A5F]">
                                        {item.label}
                                    </p>

                                    <p className="mt-2 text-sm font-semibold text-[#595959]">
                                        {item.vehicleType}
                                    </p>

                                    <p className="mt-2 inline-flex rounded-full border border-[#1F3A5F]/10 bg-white px-3 py-1 text-xs font-semibold text-[#1F3A5F] shadow-sm">
                                        {item.estimatedDuration}
                                    </p>

                                    <p className="mt-4 text-4xl font-black text-[#1F3A5F]">
                                        {item.price}
                                    </p>

                                    <p className="mt-3 text-sm leading-7 text-[#595959]">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="reveal-card mt-10 rounded-[2rem] bg-[#EAF2FB] p-6 shadow-[0_10px_30px_rgba(31,58,95,0.06)] sm:p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1F3A5F]">
                        {included?.title ?? "Ce qui est inclus"}
                    </p>

                    <ul className="mt-5 grid gap-2.5 text-sm leading-7 text-[#595959] sm:grid-cols-2 lg:grid-cols-3">
                        {(included?.items ?? []).map((item) => (
                            <li key={item} className="flex items-start gap-2.5">
                                <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1F3A5F]" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
