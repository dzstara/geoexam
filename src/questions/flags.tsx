import { Answer, Country, Question, QuestionCategory } from "../types";
import { randomize } from "../util/array";
import { getQuestionCountries } from "./util";

export function getFlagQuestion(): Question {
  const { country, otherCountries } = getQuestionCountries();

  return {
    category: QuestionCategory.Flags,
    title: "Which country has this flag?",
    answer: countryToNameAnswer(country),
    choices: randomize([country, ...otherCountries]).map(countryToNameAnswer),
    image: country.flag,
  };
}

function countryToNameAnswer(country: Country): Answer {
  return { id: country.alpha2, content: country.name };
}

export function getReverseFlagQuestion(): Question {
  const { country, otherCountries } = getQuestionCountries();

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
