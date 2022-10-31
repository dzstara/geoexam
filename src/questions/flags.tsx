import { Answer, Country, Filter, Question, QuestionCategory } from "../types";
import { randomize } from "../util/array";
import { getQuestionCountriesByRegion } from "./util";

export function getFlagQuestion(filter: Filter<Country>): Question {
  const { country, otherCountries } = getQuestionCountriesByRegion(filter);

  return {
    category: QuestionCategory.Flags,
    title: "Which country has this flag?",
    answer: countryToNameAnswer(country),
    choices: randomize([country, ...otherCountries]).map(countryToNameAnswer),
    illustration: <img src={country.flag} alt="The country's flag" />,
  };
}

function countryToNameAnswer(country: Country): Answer {
  return { id: country.alpha2, content: country.name };
}

export function getReverseFlagQuestion(filter: Filter<Country>): Question {
  const { country, otherCountries } = getQuestionCountriesByRegion(filter);

  return {
    category: QuestionCategory.Flags,
    title: "What is the flag of " + country.name + "?",
    answer: countryToFlagAnswer(country),
    choices: randomize([country, ...otherCountries]).map(countryToFlagAnswer),
  };
}

function countryToFlagAnswer(country: Country): Answer {
  return {
    id: country.alpha2,
    content: <img src={country.flag} alt="A flag" />,
  };
}
