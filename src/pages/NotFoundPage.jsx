import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function NotFoundPage() {
    return <section className="flex min-h-[62vh] items-center bg-[#EAF2FB] py-20 text-center"><Seo title="Page introuvable" description="Cette page n’existe pas." path="/404" /><div className="mx-auto max-w-2xl px-4"><p className="text-sm font-black uppercase tracking-[0.22em] text-[#1769E8]">Erreur 404</p><h1 className="mt-4 text-5xl font-black text-[#1F3A5F]">Cette page n’existe pas</h1><p className="mt-5 leading-8 text-[#595959]">Revenez à l’accueil pour découvrir les prestations de nettoyage intérieur automobile Laveoo.</p><Link to="/" className="premium-button mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#1F3A5F] px-7 py-3 font-semibold text-white">Retour à l’accueil</Link></div></section>;
}
