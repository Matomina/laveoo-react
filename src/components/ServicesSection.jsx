import { siteData } from "../data/siteData";

export default function ServicesSection() {
    return (
        <section id="services" className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-4xl font-black text-[#1F3A5F] sm:text-5xl">
                        Services
                    </h2>
                    <p className="mt-5 text-lg leading-8 text-[#595959]">
                        Une prestation claire, simple à réserver et pensée pour vous faire gagner du temps.
                    </p>
                </div>

                <div className="mt-14 grid gap-6 md:grid-cols-3">
                    {siteData.services.map((service) => (
                        <article
                            key={service.title}
                            className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF2FB] text-3xl">
                                {service.icon}
                            </div>
                            <h3 className="mt-6 text-2xl font-bold text-[#1F3A5F]">{service.title}</h3>
                            <p className="mt-4 text-base leading-8 text-[#595959]">{service.text}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}