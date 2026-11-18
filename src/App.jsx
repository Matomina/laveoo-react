import { lazy, Suspense, useEffect } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppFloatingButton from "./components/WhatsAppFloatingButton";
import ChatWidget from "./components/ChatWidget";
import useRevealOnScroll from "./hooks/useRevealOnScroll";
import HomePage from "./pages/HomePage";
import PricingPage from "./pages/PricingPage";
import ResultsPage from "./pages/ResultsPage";
import MethodsPage from "./pages/MethodsPage";
import FaqPage from "./pages/FaqPage";
import ContactPage from "./pages/ContactPage";
import ReservationPage from "./pages/ReservationPage";
import NettoyageAutoDomicilePage from "./pages/NettoyageAutoDomicilePage";
import NettoyageSiegesPage from "./pages/NettoyageSiegesPage";
import GuideTachePage from "./pages/GuideTachePage";
import GuidesIndexPage from "./pages/GuidesIndexPage";
import VillePage from "./pages/VillePage";
import NotFoundPage from "./pages/NotFoundPage";
import MentionsLegalesPage from "./pages/MentionsLegalesPage";
import ZonesInterventionPage from "./pages/ZonesInterventionPage";
import DepartementPage from "./pages/DepartementPage";
import PolitiqueConfidentialitePage from "./pages/PolitiqueConfidentialitePage";

// Les pages ci-dessus sont pré-rendues en HTML statique (scripts/prerender.mjs)
// et importées ici de façon statique (pas de React.lazy) : hydrateRoot doit
// pouvoir reconstituer le contenu du premier coup. Un <Suspense>/React.lazy
// autour d'une route hydratée casse systématiquement l'hydratation, car les
// marqueurs de commentaires nécessaires (<!--$-->/<!--/$-->) ne sont produits
// que par un vrai rendu serveur React (renderToString/renderToPipeableStream)
// — nos pages statiques sont une capture du DOM final, pas un vrai SSR, donc
// elles n'ont pas ces marqueurs. Résultat testé : même en préchargeant et en
// attendant le chunk de la route avant hydrateRoot, React ne peut pas
// réconcilier un <Suspense> hydraté sans eux (décalage de mise en page
// massif). Seules les pages admin (jamais pré-rendues, jamais visitées par
// Google, gourmandes en dépendances comme jsPDF/Supabase/html2canvas)
// restent en lazy, sans ce problème puisqu'elles ne sont jamais hydratées.
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboardPage = lazy(() => import("./pages/admin/AdminDashboardPage"));
const AdminFacturesListPage = lazy(() => import("./pages/admin/AdminFacturesListPage"));
const AdminNewFacturePage = lazy(() => import("./pages/admin/AdminNewFacturePage"));
const AdminConversationsPage = lazy(() => import("./pages/admin/AdminConversationsPage"));
const RequireAuth = lazy(() => import("./components/RequireAuth"));

function SiteLayout() {
    const { pathname } = useLocation();
    useRevealOnScroll(pathname);

    // Mémorise la dernière page visitée avant la réservation, pour savoir
    // depuis quelle page un client a cliqué sur "Réserver en ligne" (le lien
    // existe sur une dizaine de pages différentes, donc plus simple de suivre
    // ça une seule fois ici plutôt que de modifier chaque lien).
    useEffect(() => {
        if (pathname !== "/reservation") {
            sessionStorage.setItem("laveoo_derniere_page_avant_reservation", pathname);
        }
    }, [pathname]);

    return (
        <div className="min-h-screen bg-[#F5F5F5] text-[#595959] antialiased">
            <ScrollToTop />
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[999] focus:rounded-full focus:bg-[#1F3A5F] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white">Aller au contenu principal</a>
            <Header />
            <main id="main-content" className="overflow-x-hidden">
                <Outlet />
            </main>
            <Footer />
            <WhatsAppFloatingButton />
            <ChatWidget />
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
                <Route path="nos-zones-d-intervention" element={<ZonesInterventionPage />} />
                <Route path="nettoyage-auto-essonne" element={<DepartementPage slug="essonne" />} />
                <Route path="nettoyage-auto-val-de-marne" element={<DepartementPage slug="val-de-marne" />} />
                <Route path="nettoyage-auto-seine-et-marne" element={<DepartementPage slug="seine-et-marne" />} />
                <Route path="politique-de-confidentialite" element={<PolitiqueConfidentialitePage />} />
                <Route path="nettoyage-auto/:slug" element={<VillePage />} />
                <Route path="nettoyage-auto-domicile" element={<NettoyageAutoDomicilePage />} />
                <Route path="nettoyage-sieges-voiture" element={<NettoyageSiegesPage />} />
                <Route path="comment-nettoyer" element={<GuidesIndexPage />} />
                <Route path="comment-nettoyer/:slug" element={<GuideTachePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>

            <Route path="admin/login" element={<Suspense fallback={null}><AdminLoginPage /></Suspense>} />
            <Route element={<Suspense fallback={null}><RequireAuth /></Suspense>}>
                <Route path="admin" element={<Suspense fallback={null}><AdminLayout /></Suspense>}>
                    <Route index element={<Suspense fallback={null}><AdminDashboardPage /></Suspense>} />
                    <Route path="factures" element={<Suspense fallback={null}><AdminFacturesListPage /></Suspense>} />
                    <Route path="factures/nouvelle" element={<Suspense fallback={null}><AdminNewFacturePage /></Suspense>} />
                    <Route path="conversations" element={<Suspense fallback={null}><AdminConversationsPage /></Suspense>} />
                </Route>
            </Route>
        </Routes>
    );
}
