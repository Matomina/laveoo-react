import { useState } from "react";
import { Link } from "react-router-dom";
import { vehicles } from "../data/vehicles";

const normalize = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

export default function VehicleSearch({ onVehicleFound }) {
  const [search, setSearch] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const query = normalize(search);

  // Recherche exacte du véhicule
  const vehicle = vehicles.find(
    (item) =>
      normalize(`${item.brand} ${item.model}`) === query ||
      normalize(item.model) === query
  );

  // Plusieurs suggestions possibles
  const suggestions =
    query.length >= 2
      ? vehicles
          .filter((item) => {
            const model = normalize(item.model);
            const brand = normalize(item.brand);
            const fullName = normalize(`${item.brand} ${item.model}`);

            return (
              model.includes(query) ||
              brand.includes(query) ||
              fullName.includes(query)
            );
          })
          .sort((first, second) => {
            const firstModel = normalize(first.model);
            const secondModel = normalize(second.model);

            // Correspondance exacte en premier
            if (firstModel === query && secondModel !== query) {
              return -1;
            }

            if (firstModel !== query && secondModel === query) {
              return 1;
            }

            // Puis les modèles qui commencent par la recherche
            const firstStarts = firstModel.startsWith(query);
            const secondStarts = secondModel.startsWith(query);

            if (firstStarts && !secondStarts) return -1;
            if (!firstStarts && secondStarts) return 1;

            return firstModel.localeCompare(secondModel);
          })
          .slice(0, 6)
      : [];

  const handleSearchChange = (event) => {
    // On tape juste : on ne filtre/scroll qu'au clic sur une suggestion.
    setSearch(event.target.value);
    setConfirmed(false);
  };

  const selectVehicle = (selectedVehicle) => {
    const vehicleName = `${selectedVehicle.brand} ${selectedVehicle.model}`;

    setSearch(vehicleName);
    setConfirmed(true);

    onVehicleFound?.(selectedVehicle.category);
  };

  return (
    <div className="premium-card mx-auto mb-16 max-w-2xl rounded-3xl border border-[#1F3A5F]/10 bg-white p-8 shadow-[0_20px_60px_rgba(31,58,95,0.08)] sm:p-10">
      <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-[#1F3A5F]/60">
        Tarif personnalisé
      </p>

      <h3 className="mt-3 text-center text-3xl font-black tracking-tight text-[#1F3A5F] sm:text-4xl">
        Quelle est votre voiture ?
      </h3>

      <p className="mx-auto mt-3 max-w-md text-center leading-7 text-[#595959]">
        Entrez votre modèle pour afficher votre forfait.
      </p>

      <div className="relative mt-7">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1F3A5F]/35"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          type="text"
          placeholder="Exemple : Peugeot 308"
          value={search}
          onChange={handleSearchChange}
          className="w-full rounded-2xl border border-[#1F3A5F]/15 bg-[#F8FAFC] py-4 pl-12 pr-5 font-medium text-[#1F3A5F] outline-none transition placeholder:text-[#1F3A5F]/35 focus:border-[#1F3A5F]/40 focus:bg-white focus:shadow-[0_0_0_4px_rgba(31,58,95,0.08)]"
        />
      </div>

      {search && suggestions.length > 0 && !confirmed && (
        <div className="mt-4 flex flex-col gap-2">
          {suggestions.map((item) => (
            <button
              key={`${item.brand}-${item.model}`}
              type="button"
              onClick={() => selectVehicle(item)}
              className="group flex items-center justify-between rounded-2xl border border-[#1F3A5F]/10 bg-[#F8FAFC] px-5 py-3.5 text-left font-semibold text-[#1F3A5F] transition hover:border-transparent hover:bg-[#1F3A5F] hover:text-white hover:shadow-[0_14px_32px_rgba(31,58,95,0.2)]"
            >
              <span>
                {item.brand} {item.model}
              </span>

              <svg
                className="h-4 w-4 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          ))}
        </div>
      )}

      {confirmed && vehicle && (
        <div className="mt-5 flex flex-col items-center gap-4">
          <div className="flex w-fit items-center gap-2 rounded-full bg-[#EAF2FB] px-5 py-2.5 text-sm font-semibold text-[#1F3A5F]">
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Votre forfait s’affiche juste en dessous.
          </div>

          <Link
            to={`/reservation?vehicule=${vehicle.category === 1 ? "citadines" : vehicle.category === 2 ? "compactes-berlines-suv-compacts" : "suv-familiaux-monospaces-breaks"}`}
            className="premium-button inline-flex min-h-12 items-center justify-center rounded-full bg-[#1769E8] px-6 py-3 font-bold text-white shadow-[0_12px_30px_rgba(23,105,232,0.22)]"
          >
            Réserver ce forfait
          </Link>
        </div>
      )}
    </div>
  );
}