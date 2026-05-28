import { siteData } from "../data/siteData";

export default function MethodSection() {
    const { method } = siteData;

    if (!method) {
        return null;
    }

    return (
        <section
            id={method.anchorId ?? "methode"}
            className="relative overflow-hidden bg-[#F5F5F5] py-16 sm:py-20 lg:py-24"
            aria-labelledby="method-title"
        >
            <div className="absolute left-0 top-10 h-48 w-48 rounded-full bg-[#EAF2FB] blur-3xl" />
            <div className="absolute right-0 bottom-10 h-56 w-56 rounded-full bg-[#1F3A5F]/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="reveal-card text-sm font-semibold uppercase tracking-[0.18em] text-[#1F3A5F]">
                        {method.eyebrow ?? "Notre méthode"}
                    </p>

                    <h2
                        id="method-title"
                        className="reveal-card mt-4 text-3xl font-black tracking-tight text-[#1F3A5F] sm:text-4xl lg:text-5xl"
                    >
                        {method.title ?? "Notre méthode de travail"}
                    </h2>

                    <p className="reveal-card mx-auto mt-5 max-w-2xl text-base leading-8 text-[#595959] sm:text-lg">
                        {method.intro}
                    </p>
                </div>

                <div className="mt-12 grid gap-6 lg:grid-cols-4">
                    {(method.steps ?? []).map((step, index) => (
                        <article
                            key={step.title}
                            className="reveal-card rounded-[1.75rem] border border-white/80 bg-white/85 p-5 shadow-[0_18px_50px_rgba(31,58,95,0.08)] backdrop-blur"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF2FB] text-sm font-black text-[#1F3A5F]">
                                {String(index + 1).padStart(2, "0")}
                            </div>

                            <h3 className="mt-5 text-lg font-black text-[#1F3A5F]">
                                {step.title}
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-[#595959]">
                                {step.description}
                            </p>
                        </article>
                    ))}
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {(method.videos ?? []).map((video) => (
                        <article
                            key={video.src}
                            className="reveal-card overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 p-3 shadow-[0_18px_50px_rgba(31,58,95,0.08)] backdrop-blur"
                        >
                            <div className="overflow-hidden rounded-[1.35rem] bg-[#EAF2FB]">
                                <video
                                    className="aspect-[9/14] w-full object-cover"
                                    controls
                                    muted
                                    playsInline
                                    preload="metadata"
                                    aria-label={video.label}
                                >
                                    <source src={video.src} type="video/mp4" />
                                    Votre navigateur ne prend pas en charge la lecture vidéo.
                                </video>
                            </div>

                            <p className="px-2 pb-2 pt-4 text-sm font-semibold text-[#1F3A5F]">
                                {video.label}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
