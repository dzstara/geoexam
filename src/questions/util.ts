import {
  getRandomCountry,
  getRelatedCountriesByRegion,
  getRelatedCountriesByTld,
} from "../data/country";
import { Country } from "../types";
import { randomize } from "../util/array";

function createQuestionGetter(
  getRelated: (country: Country) => Country[],
  filter?: (country: Country) => boolean
) {
  return function () {
    const country = getRandomCountry(filter);
    const otherCountries = randomize(getRelated(country)).slice(0, 3);

    while (otherCountries.length < 3) {
      otherCountries.push(getRandomCountry());
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
