import Header from "./components/Header";
import Hero from "./components/Hero";
import ServicesSection from "./components/ServicesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#595959]">
      <Header />
      <main>
        <Hero />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}