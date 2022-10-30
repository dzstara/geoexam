import { Answer, Country, Question, QuestionCategory } from "../types";
import { randomize } from "../util/array";
import { getQuestionCountriesByTld } from "./util";

export function getTldQuestion(): Question {
  const { country, otherCountries } = getQuestionCountriesByTld();

  return {
    category: QuestionCategory.TLDs,
    title: country.tld + " is the top-level domain of which country?",
    answer: countryToNameAnswer(country),
    choices: randomize([country, ...otherCountries]).map(countryToNameAnswer),
  };
}

export function getReverseTldQuestion(): Question {
  const { country, otherCountries } = getQuestionCountriesByTld();

  const answer = countryToTldAnswer(country);

  return {
    category: QuestionCategory.TLDs,
    title: "What is the top-level domain of " + country.name + "?",
    answer,
    choices: randomize([answer, ...otherCountries.map(countryToTldAnswer)]),
  };
}

function countryToNameAnswer(country: Country): Answer {
  return { id: country.alpha2, content: country.name };
}

function countryToTldAnswer(country: Country): Answer {
  return { id: country.alpha2, content: country.tld };
}
