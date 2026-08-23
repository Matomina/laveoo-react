import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import PricingPage from "./pages/PricingPage";
import ResultsPage from "./pages/ResultsPage";
import MethodsPage from "./pages/MethodsPage";
import FaqPage from "./pages/FaqPage";
import ContactPage from "./pages/ContactPage";
import SeoContentPage from "./pages/SeoContentPage";
import VillePage from "./pages/VillePage";
import NotFoundPage from "./pages/NotFoundPage";
import useRevealOnScroll from "./hooks/useRevealOnScroll";
import autoCleaningRaw from "./content/nettoyage-auto-domicile.txt?raw";
import seatsCleaningRaw from "./content/nettoyage-sieges.txt?raw";

function SiteLayout() {
    const { pathname } = useLocation();
    useRevealOnScroll(pathname);

    return (
        <div className="min-h-screen bg-[#F5F5F5] text-[#595959] antialiased">
            <ScrollToTop />
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[999] focus:rounded-full focus:bg-[#1F3A5F] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white">Aller au contenu principal</a>
            <Header />
            <main id="main-content" className="overflow-x-hidden"><Outlet /></main>
            <Footer />
        </div>
    );
}

export default function App() {
    return (
        <Routes>
            <Route element={<SiteLayout />}>
                <Route index element={<HomePage />} />
                <Route path="tarifs" element={<PricingPage />} />
                <Route path="resultats" element={<ResultsPage />} />
                <Route path="nos-methodes-de-nettoyage" element={<MethodsPage />} />
                <Route path="faq" element={<FaqPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="nettoyage-auto/:slug" element={<VillePage />} />
                <Route path="nettoyage-auto-domicile" element={<SeoContentPage eyebrow="Service mobile" title="Nettoyage auto à domicile" intro="Retrouvez un habitacle propre sans perdre de temps : Laveoo intervient directement à votre domicile ou sur votre lieu de travail avec des produits et du matériel professionnels." description="Nettoyage intérieur de voiture à domicile dans le sud de l’Île-de-France avec Laveoo. Intervention professionnelle, déplacement inclus et matériel adapté." path="/nettoyage-auto-domicile" raw={autoCleaningRaw} />} />
                <Route path="nettoyage-sieges-voiture" element={<SeoContentPage eyebrow="Textile, cuir et Alcantara" title="Nettoyage des sièges de voiture" intro="Laveoo nettoie vos sièges de voiture à domicile avec des produits et des méthodes adaptés à chaque revêtement." description="Nettoyage des sièges de voiture à domicile par Laveoo : tissu, cuir, cuir perforé, Alcantara, taches, odeurs et salissures du quotidien." path="/nettoyage-sieges-voiture" raw={seatsCleaningRaw} />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}