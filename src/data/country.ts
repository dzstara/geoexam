import { countries } from "../generated-data/countries";
import { Country } from "../types";
import { getRandomItem, intersect } from "../util/array";
import { clone } from "../util/clone";

export function getRandomCountry(filter?: (country: Country) => boolean) {
  let list = Object.values(countries);

  if (filter) {
    list = list.filter(filter);
  }

  return clone(getRandomItem(list));
}

export function getRelatedCountriesByRegion(input: Country): Country[] {
  return clone(Object.values(countries)).filter(
    (c) => c.alpha2 !== input.alpha2 && intersect(input.groups, c.groups).length
  );
}

export function getRelatedCountriesByTld(input: Country): Country[] {
  const list = Object.values(countries).filter((c) => c.tld);
  return clone(list).filter(
    (c) =>
      c.alpha2 !== input.alpha2 &&
      (input.tld![1] === c.tld![1] || input.tld![2] === c.tld![2])
  );
}
