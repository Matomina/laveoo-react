import { siteData } from "../data/siteData";

export default function HowItWorks() {
    const { steps, title } = siteData.process;

    return (
        <section className="bg-white py-10 lg:py-12" aria-labelledby="how-it-works-title">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <h2 id="how-it-works-title" className="sr-only">{title}</h2>
                <ol className="flex items-start justify-between">
                    {steps.map((step, index) => (
                        <li key={step.title} className="flex flex-1 items-center">
                            <div className="flex flex-1 flex-col items-center text-center">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1F3A5F] text-[11px] font-black text-white sm:h-8 sm:w-8 sm:text-xs">
                                    {index + 1}
                                </span>
                                <span className="mt-1.5 text-[10px] font-bold leading-tight text-[#1F3A5F] sm:text-xs">
                                    {step.title}
                                </span>
                            </div>
                            {index < steps.length - 1 && (
                                <div aria-hidden="true" className="mb-4 h-px flex-1 bg-[#93B8D8]/60 sm:mb-5" />
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
