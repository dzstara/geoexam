import { getRandomCountry, getRelatedCountries } from "../data/country";
import { Question } from "../types";
import { countryToAnswer } from "../util/answer";
import { randomize } from "../util/array";

export function getFlagQuestion(): Question {
  const country = getRandomCountry();
  const otherCountries = randomize(getRelatedCountries(country)).slice(0, 3);

  while (otherCountries.length < 3) {
    otherCountries.push(getRandomCountry());
  }

  return {
    title: "Which country has this flag",
    answer: countryToAnswer(country),
    choices: randomize([country, ...otherCountries]).map(countryToAnswer),
    image: country.flag,
  };
}
