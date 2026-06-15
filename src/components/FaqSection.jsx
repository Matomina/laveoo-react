import { siteData } from "../data/siteData";

export default function FaqSection() {
    const { faq } = siteData;

    return (
        <section
            id="faq"
            className="bg-[#F5F5F5] py-20 lg:py-24"
            aria-labelledby="faq-title"
        >
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="reveal-card mx-auto max-w-3xl text-center">
                    <h2
                        id="faq-title"
                        className="text-4xl font-black tracking-tight text-[#1F3A5F] sm:text-5xl"
                    >
                        {faq?.title ?? "FAQ"}
                    </h2>
                </div>

                <div className="mt-14 grid gap-5">
                    {(faq?.items ?? []).map((item) => (
                        <details
                            key={item.question}
                            className="reveal-card group rounded-[1.75rem] border border-[#93B8D8] bg-white p-6 shadow-[0_16px_44px_rgba(31,58,95,0.08)]"
                        >
                            <summary className="cursor-pointer list-none text-lg font-bold text-[#1F3A5F] marker:hidden">
                                <span className="flex items-center justify-between gap-4">
                                    <span>{item.question}</span>
                                    <span className="text-2xl font-medium text-[#1F3A5F]/50 transition group-open:rotate-45">
                                        +
                                    </span>
                                </span>
                            </summary>

                            <div className="mt-4 space-y-3">
                                {item.answer.split("\n\n").map((para, i) => (
                                    <p key={i} className="text-base leading-8 text-[#595959]">
                                        {para}
                                    </p>
                                ))}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
