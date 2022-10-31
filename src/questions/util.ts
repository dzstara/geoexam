import {
  getRandomCountry,
  getRelatedCountriesByRegion,
  getRelatedCountriesByTld,
} from "../data/country";
import { Country, Filter } from "../types";
import { combineFilterFns, randomize } from "../util/array";

function createQuestionGetter(
  getRelated: (country: Country) => Country[],
  defaultFilter?: (country: Country) => boolean
) {
  return function (filter: Filter<Country>) {
    const country = getRandomCountry(combineFilterFns(defaultFilter, filter));
    const otherCountries = randomize(getRelated(country)).slice(0, 3);

    while (otherCountries.length < 3) {
      otherCountries.push(getRandomCountry(defaultFilter));
    }
    return { country, otherCountries };
  };
}

export const getQuestionCountriesByRegion = createQuestionGetter(
  getRelatedCountriesByRegion
);

export const getQuestionCountriesByTld = createQuestionGetter(
  getRelatedCountriesByTld,
  (c) => !!c.tld
);
