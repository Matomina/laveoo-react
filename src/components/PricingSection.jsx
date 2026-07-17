import PricingCards from "./PricingCards";
import { siteData } from "../data/siteData";

export default function PricingSection() {
    const { pricing } = siteData;
    return (
        <section id="tarifs" className="bg-[#F5F5F5] py-20 lg:py-24" aria-labelledby="pricing-title">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <header className="reveal-card mx-auto max-w-3xl text-center">
                    <h2 id="pricing-title" className="text-4xl font-black tracking-tight text-[#1F3A5F] sm:text-5xl">{pricing.title}</h2>
                    <p className="mt-5 text-lg leading-8 text-[#595959]">{pricing.intro}</p>
                </header>
                <div className="mt-14"><PricingCards /></div>
            </div>
        </section>
    );
}
