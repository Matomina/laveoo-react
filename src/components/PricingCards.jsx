import { useState } from "react";
import { Link } from "react-router-dom";
import { siteData } from "../data/siteData";

export default function PricingCards({ compact = false }) {
    const { pricing, included } = siteData;
    const [openId, setOpenId] = useState(null);
    const [optionOpen, setOptionOpen] = useState(false);

    const togglePlan = (id) => {
        setOptionOpen(false);
        setOpenId((current) => (current === id ? null : id));
    };

    const toggleOption = () => {
        setOpenId(null);
        setOptionOpen((current) => !current);
    };

    return (
        <div>
            <div className="grid items-start gap-6 lg:grid-cols-3">
                {pricing.items.map((plan, index) => {
                    const isOpen = openId === plan.id;
                    return (
                        <article key={plan.id} className={`reveal-card overflow-hidden rounded-[2rem] border bg-white shadow-[0_18px_55px_rgba(31,58,95,0.10)] transition duration-300 ${isOpen ? "border-[#387EE8] shadow-[0_24px_65px_rgba(56,126,232,0.18)]" : "border-[#93B8D8]/45"}`}>
                            <button type="button" onClick={() => togglePlan(plan.id)} aria-expanded={isOpen} aria-controls={`plan-${plan.id}`} className="block w-full p-5 text-left sm:p-6">
                                <div className={`relative flex items-center justify-center overflow-hidden rounded-[1.4rem] bg-white transition-[height] duration-500 ${isOpen ? "h-24 sm:h-32" : "h-44 sm:h-48"}`}>
                                    <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF2FB] text-xs font-black text-[#1F3A5F]">0{index + 1}</span>
                                    <img src={plan.media.src} alt={plan.media.alt} className={`h-full w-full object-contain transition duration-500 ${index === 2 ? "scale-110" : ""}`} loading="lazy" />
                                </div>

                                <div className="mt-5 border-t-2 border-[#93B8D8] pt-5">
                                    <h3 className="text-lg font-black uppercase leading-tight tracking-[0.02em] text-[#102A59]">{plan.shortLabel}</h3>
                                    <p className="mt-2 text-sm font-medium text-[#595959]">{plan.vehicleType}</p>
                                    <p className="mt-4 inline-flex rounded-full border border-[#1F3A5F]/10 bg-white px-3 py-1.5 text-xs font-bold text-[#1F3A5F] shadow-sm">Temps estimé : {plan.estimatedDuration}</p>
                                    <div className="mt-4 flex items-end justify-between gap-4">
                                        <p className="text-5xl font-black leading-none text-[#102A59]">{plan.price} €</p>
                                        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF2FB] text-xl font-black text-[#1F3A5F] transition ${isOpen ? "rotate-45" : ""}`} aria-hidden="true">+</span>
                                    </div>
                                    <p className="mt-4 text-sm leading-7 text-[#595959]">{plan.description}</p>
                                    <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-[#387EE8]">{isOpen ? "Masquer le détail" : "Afficher le détail"}</p>
                                </div>
                            </button>

                            <div id={`plan-${plan.id}`} className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                                <div className="overflow-hidden">
                                    <div className="max-h-[29svh] overflow-y-auto border-t border-slate-100 px-5 pb-6 pt-5 sm:max-h-[52svh] sm:px-6 lg:max-h-[60vh]">
                                        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1F3A5F]/60">Exemples de véhicules</p>
                                        <p className="mt-2 text-sm leading-7 text-[#595959]">{plan.examples}</p>
                                        <p className="mt-5 text-sm leading-7 text-[#595959]">Préserver votre véhicule est notre priorité. Notre méthode s’adapte à chaque matériau pour nettoyer en profondeur tout en respectant les cuirs, l’Alcantara, les plastiques sensibles et les finitions délicates.</p>
                                        <p className="mt-5 font-black text-[#1F3A5F]">Ce qui est inclus</p>
                                        <ul className="mt-3 space-y-2.5">
                                            {included.items.map((item) => <li key={item} className="flex gap-2.5 text-sm leading-6 text-[#595959]"><span className="font-black text-[#387EE8]">✓</span><span>{item}</span></li>)}
                                        </ul>
                                        <div className="mt-5 rounded-2xl bg-[#EAF2FB] p-4">
                                            <p className="font-black text-[#1F3A5F]">Option +1 heure : +39 €</p>
                                            <p className="mt-1 text-sm leading-6 text-[#595959]">Recommandée pour un véhicule très sale ou des finitions plus minutieuses.</p>
                                        </div>
                                        <Link to={`/contact?forfait=${plan.id}`} className="premium-button mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#1769E8] px-5 py-3 font-bold text-white shadow-[0_12px_30px_rgba(23,105,232,0.22)]">Réserver ce forfait</Link>
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>

            <article className={`reveal-card mt-7 overflow-hidden rounded-[2rem] border border-[#93B8D8]/70 bg-white shadow-[0_18px_55px_rgba(31,58,95,0.09)] ${compact ? "mx-auto max-w-5xl" : ""}`}>
                <button type="button" onClick={toggleOption} aria-expanded={optionOpen} aria-controls="pricing-option" className="flex w-full flex-col items-center gap-5 p-6 text-center sm:flex-row sm:text-left lg:p-8">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.5rem] bg-[#EAF2FB] text-4xl" aria-hidden="true">⏱️</div>
                    <div className="flex-1">
                        <h3 className="text-2xl font-black uppercase text-[#102A59]">Option : +1 heure de prestation</h3>
                        <p className="mt-2 leading-7 text-[#595959]">{pricing.option.description}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-4">
                        <p className="rounded-full bg-[#D9E9FF] px-6 py-3 text-3xl font-black text-[#1769E8]">+{pricing.option.price} €</p>
                        <span className={`flex h-10 w-10 items-center justify-center rounded-full bg-[#1769E8] text-xl font-black text-white transition ${optionOpen ? "rotate-45" : ""}`} aria-hidden="true">+</span>
                    </div>
                </button>
                <div id="pricing-option" className={`grid transition-[grid-template-rows] duration-500 ease-out ${optionOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                        <div className="border-t border-slate-100 p-6 lg:p-8">
                            <div className="grid gap-3 sm:grid-cols-2">
                                {pricing.option.benefits.map((benefit) => <p key={benefit} className="flex gap-3 rounded-2xl bg-[#F8FAFC] p-4 text-sm leading-6 text-[#595959]"><span className="font-black text-[#1769E8]">✓</span>{benefit}</p>)}
                            </div>
                            <Link to="/contact?option=plus-une-heure" className="premium-button mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-[#1769E8] px-6 py-3 font-bold text-white">Ajouter l’option</Link>
                        </div>
                    </div>
                </div>
            </article>

            <p className="mx-auto mt-5 max-w-3xl text-center text-sm font-semibold text-[#1F3A5F]">✓ Tous nos forfaits incluent un nettoyage intérieur complet et professionnel.</p>
        </div>
    );
}
