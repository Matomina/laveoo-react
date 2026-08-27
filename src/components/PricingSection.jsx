import { useEffect, useState } from "react";
import PricingCards from "./PricingCards";
import { siteData } from "../data/siteData";
import VehicleSearch from "./VehicleSearch";

export default function PricingSection({ title, intro }) {
  const { pricing } = siteData;
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [searchToken, setSearchToken] = useState(0);

  const categoryToPlan = {
    1: "citadines",
    2: "compactes-berlines-suv-compacts",
    3: "suv-familiaux-monospaces-breaks",
  };

  const handleVehicleFound = (category) => {
    setSelectedPlanId(categoryToPlan[category] ?? null);
    // On force un nouveau déclenchement du scroll même si on
    // retombe sur la même catégorie que la recherche précédente.
    setSearchToken((token) => token + 1);
  };

  useEffect(() => {
    if (!selectedPlanId) return;

    let attempts = 0;
    let frameId;

    // On réessaie à chaque frame jusqu'à ce que la carte existe réellement
    // dans la page (le rendu de React n'est pas toujours immédiat).
    const tryScroll = () => {
      const card = document.getElementById(`pricing-${selectedPlanId}`);

      if (card) {
        // Cette carte est nouvellement affichée par la recherche : elle ne
        // passe jamais par la détection au scroll (reveal-card), donc on la
        // rend visible immédiatement pour éviter l'effet de zone blanche.
        card.dataset.revealed = "true";

        card.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        return;
      }

      attempts += 1;

      if (attempts < 60) {
        frameId = requestAnimationFrame(tryScroll);
      }
    };

    frameId = requestAnimationFrame(tryScroll);

    return () => cancelAnimationFrame(frameId);
  }, [selectedPlanId, searchToken]);

  return (
    <section
      id="tarifs"
      className="bg-[#F5F5F5] py-20 lg:py-24"
      aria-labelledby="pricing-title"
    >
      <VehicleSearch onVehicleFound={handleVehicleFound} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="reveal-card mx-auto max-w-3xl text-center">
          <h2
            id="pricing-title"
            className="text-4xl font-black tracking-tight text-[#1F3A5F] sm:text-5xl"
          >
            {title ?? pricing.title}
          </h2>

          <p className="mt-5 text-lg leading-8 text-[#595959]">
            {intro ?? pricing.intro}
          </p>
        </header>

        <div className="mt-14">
          <PricingCards selectedPlanId={selectedPlanId} />
        </div>
      </div>
    </section>
  );
}