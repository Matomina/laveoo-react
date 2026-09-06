import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { siteData } from "../data/siteData";

function PlanCard({ plan, index, included, id, onPrev, onNext }) {
  return (
    <article
      id={id}
      className="reveal-card flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#93B8D8]/45 bg-white shadow-[0_18px_55px_rgba(31,58,95,0.10)]"
    >
      <div className="p-5 pb-0 sm:p-6 sm:pb-0">
        <span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF2FB] text-xs font-black text-[#1F3A5F]">
          0{index + 1}
        </span>
        <h3 className="mt-3 text-lg font-black uppercase leading-tight tracking-[0.02em] text-[#102A59]">
          {plan.shortLabel}
        </h3>
      </div>

      <div className="relative mt-3 flex h-44 touch-pan-y select-none items-center justify-center overflow-hidden bg-white sm:h-48">
        <img
          src={plan.media.src}
          alt={plan.media.alt}
          className={`h-full w-full object-contain ${
            index === 2 ? "scale-[1.3]" : ""
          }`}
          loading="lazy"
          draggable={false}
        />

        {onPrev && (
          <button
            type="button"
            onClick={onPrev}
            aria-label="Forfait précédent"
            className="absolute left-2 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#1F3A5F] text-lg font-black text-white shadow-[0_8px_20px_rgba(31,58,95,0.35)]"
          >
            ‹
          </button>
        )}

        {onNext && (
          <button
            type="button"
            onClick={onNext}
            aria-label="Forfait suivant"
            className="absolute right-2 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#1F3A5F] text-lg font-black text-white shadow-[0_8px_20px_rgba(31,58,95,0.35)]"
          >
            ›
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col border-t-2 border-[#93B8D8] p-5 sm:p-6">
        <p className="inline-flex w-fit rounded-full border border-[#1F3A5F]/10 bg-white px-3 py-1.5 text-xs font-bold text-[#1F3A5F] shadow-sm">
          Temps estimé : {plan.estimatedDuration}
        </p>

        <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-[#1F3A5F]/60">
          {included.title}
        </p>

        <ul className="mt-3 space-y-2.5">
          {included.items.map((item) => (
            <li
              key={item}
              className="flex gap-2.5 text-sm leading-6 text-[#595959]"
            >
              <span className="font-black text-[#387EE8]">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-5xl font-black leading-none text-[#102A59]">
          {plan.price} €
        </p>

        <Link
          to={`/reservation?vehicule=${plan.id}`}
          className="premium-button mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#1769E8] px-5 py-3 font-bold text-white shadow-[0_12px_30px_rgba(23,105,232,0.22)]"
        >
          Réserver ce forfait
        </Link>
      </div>
    </article>
  );
}

const SWIPE_THRESHOLD = 45;

export default function PricingCards({
  compact = false,
  selectedPlanId = null,
}) {
  const { pricing, included } = siteData;
  const [optionOpen, setOptionOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const swipeStart = useRef(null);

  const plans = selectedPlanId
    ? pricing.items.filter((plan) => plan.id === selectedPlanId)
    : pricing.items;

  const goTo = (index) => {
    const count = plans.length;
    setActiveIndex(((index % count) + count) % count);
  };

  const handlePointerDown = (e) => {
    swipeStart.current = e.clientX;
  };

  const handlePointerUp = (e) => {
    if (swipeStart.current === null) return;
    const delta = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (delta > SWIPE_THRESHOLD) goTo(activeIndex - 1);
    else if (delta < -SWIPE_THRESHOLD) goTo(activeIndex + 1);
  };

  const active = plans[activeIndex];

  return (
    <div>
      {/* ── Mobile : carrousel une carte à la fois ── */}
      {active && (
        <div className="sm:hidden">
          <div
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              swipeStart.current = null;
            }}
          >
            <PlanCard
              plan={active}
              index={plans.indexOf(active)}
              included={included}
              onPrev={plans.length > 1 ? () => goTo(activeIndex - 1) : undefined}
              onNext={plans.length > 1 ? () => goTo(activeIndex + 1) : undefined}
            />
          </div>

          {plans.length > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              {plans.map((plan, index) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Voir le forfait ${index + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    index === activeIndex ? "w-6 bg-[#1769E8]" : "w-2 bg-[#93B8D8]/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Ordinateur / tablette : grille complète ── */}
      <div className="hidden gap-6 sm:grid sm:grid-cols-1 lg:grid-cols-3 sm:items-stretch">
        {plans.map((plan, index) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            index={index}
            included={included}
            id={`pricing-${plan.id}`}
          />
        ))}
      </div>

      <article
        className={`reveal-card mt-7 overflow-hidden rounded-[2rem] border border-[#93B8D8]/70 bg-white shadow-[0_18px_55px_rgba(31,58,95,0.09)] ${
          compact ? "mx-auto max-w-5xl" : ""
        }`}
      >
        <button
          type="button"
          onClick={() => setOptionOpen((current) => !current)}
          aria-expanded={optionOpen}
          aria-controls="pricing-option"
          className="flex w-full flex-col items-center gap-5 p-6 text-center sm:flex-row sm:text-left lg:p-8"
        >
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.5rem] bg-[#EAF2FB] text-4xl"
            aria-hidden="true"
          >
            ⏱️
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-black uppercase text-[#102A59]">
              Option : +1 heure de prestation
            </h3>

            <p className="mt-2 leading-7 text-[#595959]">
              {pricing.option.description}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <p className="rounded-full bg-[#D9E9FF] px-6 py-3 text-3xl font-black text-[#1769E8]">
              +{pricing.option.price} €
            </p>

            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-[#1769E8] text-xl font-black text-white transition ${
                optionOpen ? "rotate-45" : ""
              }`}
              aria-hidden="true"
            >
              +
            </span>
          </div>
        </button>

        <div
          id="pricing-option"
          className={`grid transition-[grid-template-rows] duration-500 ease-out ${
            optionOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-slate-100 p-6 lg:p-8">
              <div className="grid gap-3 sm:grid-cols-2">
                {pricing.option.benefits.map((benefit) => (
                  <p
                    key={benefit}
                    className="flex gap-3 rounded-2xl bg-[#F8FAFC] p-4 text-sm leading-6 text-[#595959]"
                  >
                    <span className="font-black text-[#1769E8]">
                      ✓
                    </span>
                    {benefit}
                  </p>
                ))}
              </div>

              <Link
                to="/contact?option=plus-une-heure"
                className="premium-button mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-[#1769E8] px-6 py-3 font-bold text-white"
              >
                Ajouter l’option
              </Link>
            </div>
          </div>
        </div>
      </article>

      <p className="mx-auto mt-5 max-w-3xl text-center text-sm font-semibold text-[#1F3A5F]">
        ✓ Tous nos forfaits incluent un nettoyage intérieur complet et
        professionnel.
      </p>
    </div>
  );
}
