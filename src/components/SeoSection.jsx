import { siteData } from "../data/siteData";

export default function SeoSection() {
    const { seo } = siteData;

    return (
        <section className="bg-white py-20 lg:py-24" aria-labelledby="seo-title">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="reveal-card mx-auto max-w-3xl text-center">
                    <h2
                        id="seo-title"
                        className="text-4xl font-black tracking-tight text-[#1F3A5F] sm:text-5xl"
                    >
                        {seo?.title}
                    </h2>
                </div>

                <div className="mt-12 grid gap-6">
                    {(seo?.items ?? []).map((item) => (
                        <div
                            key={item.question.slice(0, 48)}
                            className="reveal-card rounded-[2rem] border border-white/80 bg-[#F8FAFC] p-8 shadow-[0_18px_50px_rgba(31,58,95,0.08)] sm:p-10"
                        >
                            <h3 className="text-xl font-bold text-[#1F3A5F]">
                                {item.question}
                            </h3>

                            <div className="mt-4 space-y-4">
                                {item.answer.split("\n\n").map((para, i) => (
                                    <p key={i} className="text-base leading-8 text-[#595959]">
                                        {para}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
