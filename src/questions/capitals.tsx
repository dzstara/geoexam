import { MapEmbed } from "../components/MapEmbed";
import { Alpha2 } from "../generated-data/alpha2";
import { Answer, Country, Filter, Question, QuestionCategory } from "../types";
import { combineFilterFns, getRandomItem, randomize } from "../util/array";
import { getQuestionCountriesByRegion } from "./util";

export function getCapitalQuestion(filter: Filter<Country>): Question {
  const { country, otherCountries } = getQuestionCountriesByRegion(
    combineFilterFns(filter, (c) => !blacklist.includes(c.alpha2))
  );

  const capital = getRandomItem(country.capitals);

  return {
    category: QuestionCategory.CapitalCities,
    title: capital + " is the capital city of which country?",
    answer: countryToNameAnswer(country),
    choices: randomize([country, ...otherCountries]).map(countryToNameAnswer),
  };
}

export function getReverseCapitalQuestion(filter: Filter<Country>): Question {
  const { country, otherCountries } = getQuestionCountriesByRegion(
    combineFilterFns(filter, (c) => !blacklist.includes(c.alpha2))
  );

  const answer = countryToCapitalAnswer(country);

  return {
    category: QuestionCategory.CapitalCities,
    title: "What is the capital city of " + country.name + "?",
    answer,
    choices: randomize([answer, ...otherCountries.map(countryToCapitalAnswer)]),
    illustration: <MapEmbed country={country} />,
  };
}

function countryToNameAnswer(country: Country): Answer {
  return { id: country.alpha2, content: country.name };
}

function countryToCapitalAnswer(country: Country): Answer {
  return { id: country.alpha2, content: getRandomItem(country.capitals) };
}

// Countries with the same name as the capital city
const blacklist: Alpha2[] = [
  Alpha2.AD, // Andorra
  Alpha2.DJ, // Djibouti
  Alpha2.KW, // Kuwait
  Alpha2.LU, // Luxembourg
  Alpha2.MX, // Mexico
  Alpha2.MC, // Monaco
  Alpha2.PA, // Panama
  Alpha2.SM, // San Marino
  Alpha2.SG, // Singapore
];
