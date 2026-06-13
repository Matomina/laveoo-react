import Header from "./components/Header";
import Hero from "./components/Hero";
import PricingSection from "./components/PricingSection";
import ResultsSection from "./components/ResultsSection";
import MethodSection from "./components/MethodSection";
import SeoSection from "./components/SeoSection";
import FaqSection from "./components/FaqSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import useRevealOnScroll from "./hooks/useRevealOnScroll";

export default function App() {
    useRevealOnScroll();

    return (
        <div className="min-h-screen bg-[#F5F5F5] text-[#595959] antialiased">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[999] focus:rounded-full focus:bg-[#1F3A5F] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
            >
                Aller au contenu principal
            </a>

            <Header />

            <main id="main-content" className="overflow-x-hidden">
                <Hero />
                <PricingSection />
                <ResultsSection />
                <MethodSection />
                <SeoSection />
                <FaqSection />
                <ContactSection />
            </main>

            <Footer />
        </div>
    );
}
