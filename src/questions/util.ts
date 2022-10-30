import { getRandomCountry, getRelatedCountries } from "../data/country";
import { randomize } from "../util/array";

export function getQuestionCountries() {
  const country = getRandomCountry();
  const otherCountries = randomize(getRelatedCountries(country)).slice(0, 3);

  while (otherCountries.length < 3) {
    otherCountries.push(getRandomCountry());
  }
  return { country, otherCountries };
}
