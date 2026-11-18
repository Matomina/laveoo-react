import Fuse from "fuse.js";
import { vehicles } from "../data/vehicles";

export const normalize = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]/g, "");

const searchableVehicles = vehicles.map((item) => ({
  ...item,
  normalizedModel: normalize(item.model),
  normalizedBrand: normalize(item.brand),
  normalizedFullName: normalize(`${item.brand} ${item.model}`),
}));

const fuse = new Fuse(searchableVehicles, {
  keys: ["normalizedModel", "normalizedBrand", "normalizedFullName"],
  threshold: 0.3,
  distance: 60,
  ignoreLocation: true,
  minMatchCharLength: 2,
  includeScore: true,
});

export function findExactVehicle(rawQuery) {
  const query = normalize(rawQuery);

  return vehicles.find(
    (item) =>
      normalize(`${item.brand} ${item.model}`) === query ||
      normalize(item.model) === query
  );
}

export function searchVehicles(rawQuery, limit = 6) {
  const query = normalize(rawQuery);

  if (query.length < 2) return [];

  const results = fuse.search(query);

  results.sort((first, second) => {
    const firstExact =
      first.item.normalizedFullName === query ||
      first.item.normalizedModel === query;
    const secondExact =
      second.item.normalizedFullName === query ||
      second.item.normalizedModel === query;

    if (firstExact && !secondExact) return -1;
    if (!firstExact && secondExact) return 1;

    return first.score - second.score;
  });

  return results.slice(0, limit).map((result) => result.item);
}
