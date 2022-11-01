import { Flag } from "../components/Flag";
import { MapEmbed } from "../components/MapEmbed";
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
    illustration: <Flag url={country.flag} large />,
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
    illustration: <MapEmbed country={country} />,
  };
}

function countryToFlagAnswer(country: Country): Answer {
  return {
    id: country.alpha2,
    content: <Flag url={country.flag} />,
  };
}
