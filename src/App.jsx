import { lazy, Suspense } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import useRevealOnScroll from "./hooks/useRevealOnScroll";
import autoCleaningRaw from "./content/nettoyage-auto-domicile.txt?raw";
import seatsCleaningRaw from "./content/nettoyage-sieges.txt?raw";

const PricingPage = lazy(() => import("./pages/PricingPage"));
const ResultsPage = lazy(() => import("./pages/ResultsPage"));
const MethodsPage = lazy(() => import("./pages/MethodsPage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ReservationPage = lazy(() => import("./pages/ReservationPage"));
const SeoContentPage = lazy(() => import("./pages/SeoContentPage"));
const VillePage = lazy(() => import("./pages/VillePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const MentionsLegalesPage = lazy(() => import("./pages/MentionsLegalesPage"));
const PolitiqueConfidentialitePage = lazy(() => import("./pages/PolitiqueConfidentialitePage"));
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboardPage = lazy(() => import("./pages/admin/AdminDashboardPage"));
const AdminFacturesListPage = lazy(() => import("./pages/admin/AdminFacturesListPage"));
const AdminNewFacturePage = lazy(() => import("./pages/admin/AdminNewFacturePage"));
const RequireAuth = lazy(() => import("./components/RequireAuth"));

function SiteLayout() {
    const { pathname } = useLocation();
    useRevealOnScroll(pathname);

    return (
        <div className="min-h-screen bg-[#F5F5F5] text-[#595959] antialiased">
            <ScrollToTop />
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[999] focus:rounded-full focus:bg-[#1F3A5F] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white">Aller au contenu principal</a>
            <Header />
            <main id="main-content" className="overflow-x-hidden">
                <Suspense fallback={null}>
                    <Outlet />
                </Suspense>
            </main>
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
                <Route path="reservation" element={<ReservationPage />} />
                <Route path="mentions-legales" element={<MentionsLegalesPage />} />
                <Route path="politique-de-confidentialite" element={<PolitiqueConfidentialitePage />} />
                <Route path="nettoyage-auto/:slug" element={<VillePage />} />
                <Route path="nettoyage-auto-domicile" element={<SeoContentPage eyebrow="Service mobile" title="Nettoyage auto à domicile" intro="Retrouvez un habitacle propre sans perdre de temps : Laveoo intervient directement à votre domicile ou sur votre lieu de travail avec des produits et du matériel professionnels." description="Nettoyage intérieur de voiture à domicile dans le sud de l’Île-de-France avec Laveoo. Intervention professionnelle, déplacement inclus et matériel adapté." path="/nettoyage-auto-domicile" raw={autoCleaningRaw} />} />
                <Route path="nettoyage-sieges-voiture" element={<SeoContentPage eyebrow="Textile, cuir et Alcantara" title="Nettoyage des sièges de voiture" intro="Laveoo nettoie vos sièges de voiture à domicile avec des produits et des méthodes adaptés à chaque revêtement." description="Nettoyage des sièges de voiture à domicile par Laveoo : tissu, cuir, cuir perforé, Alcantara, taches, odeurs et salissures du quotidien." path="/nettoyage-sieges-voiture" raw={seatsCleaningRaw} />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>

            <Route path="admin/login" element={<Suspense fallback={null}><AdminLoginPage /></Suspense>} />
            <Route element={<Suspense fallback={null}><RequireAuth /></Suspense>}>
                <Route path="admin" element={<Suspense fallback={null}><AdminLayout /></Suspense>}>
                    <Route index element={<Suspense fallback={null}><AdminDashboardPage /></Suspense>} />
                    <Route path="factures" element={<Suspense fallback={null}><AdminFacturesListPage /></Suspense>} />
                    <Route path="factures/nouvelle" element={<Suspense fallback={null}><AdminNewFacturePage /></Suspense>} />
                </Route>
            </Route>
        </Routes>
    );
}
