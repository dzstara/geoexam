import { countries } from "../generated-data/countries";
import { Country } from "../types";
import { getRandomItem, intersect } from "../util/array";
import { clone } from "../util/clone";

export function getRandomCountry() {
  return clone(getRandomItem(Object.values(countries)));
}

export function getRelatedCountries(input: Country): Country[] {
  return clone(Object.values(countries)).filter(
    (c) => c.alpha2 !== input.alpha2 && intersect(input.groups, c.groups).length
  );
}
