import { Answer, Country, Question, QuestionCategory } from "../types";
import { getRandomItem, randomize } from "../util/array";
import { getQuestionCountriesByRegion } from "./util";

export function getCapitalQuestion(): Question {
  const { country, otherCountries } = getQuestionCountriesByRegion();

  const capital = getRandomItem(country.capitals);

  return {
    category: QuestionCategory.Capitals,
    title: capital + " is the capital of which country?",
    answer: countryToNameAnswer(country),
    choices: randomize([country, ...otherCountries]).map(countryToNameAnswer),
  };
}

export function getReverseCapitalQuestion(): Question {
  const { country, otherCountries } = getQuestionCountriesByRegion();

  const answer = countryToCapitalAnswer(country);

  return {
    category: QuestionCategory.Capitals,
    title: "What is the capital of " + country.name + "?",
    answer,
    choices: randomize([answer, ...otherCountries.map(countryToCapitalAnswer)]),
  };
}

function countryToNameAnswer(country: Country): Answer {
  return { id: country.alpha2, content: country.name };
}

function countryToCapitalAnswer(country: Country): Answer {
  return { id: country.alpha2, content: getRandomItem(country.capitals) };
}
