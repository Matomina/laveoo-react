import { Link } from "react-router-dom";

export default function SectionCta({ title, text, label = "En savoir plus", to, secondaryLabel, secondaryTo }) {
    return (
        <div className="reveal-card mx-auto mt-10 flex max-w-5xl flex-col items-center justify-between gap-6 rounded-[2rem] border border-[#93B8D8]/60 bg-[#EAF2FB] p-7 text-center shadow-[0_16px_44px_rgba(31,58,95,0.08)] sm:p-9 lg:flex-row lg:text-left">
            <div>
                <h3 className="text-2xl font-black text-[#1F3A5F]">{title}</h3>
                {text && <p className="mt-2 max-w-2xl leading-7 text-[#595959]">{text}</p>}
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Link to={to} className="premium-button inline-flex min-h-12 items-center justify-center rounded-full bg-[#1F3A5F] px-6 py-3 font-semibold text-white shadow-[0_12px_28px_rgba(31,58,95,0.18)]">
                    {label}
                </Link>
                {secondaryTo && (
                    <Link to={secondaryTo} className="premium-button inline-flex min-h-12 items-center justify-center rounded-full border border-[#1F3A5F]/15 bg-white px-6 py-3 font-semibold text-[#1F3A5F]">
                        {secondaryLabel}
                    </Link>
                )}
            </div>
        </div>
    );
}
