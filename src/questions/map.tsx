import { Country, Filter, Question, QuestionCategory } from "../types";
import { randomize } from "../util/array";
import { getQuestionCountriesByRegion } from "./util";
import { MapEmbed } from "../components/MapEmbed";

export function getMapQuestion(filter: Filter<Country>): Question {
  const { country, otherCountries } = getQuestionCountriesByRegion(filter);

  return {
    category: QuestionCategory.Map,
    title: "What country is this?",
    answer: { id: country.alpha2, content: country.name },
    choices: randomize([country, ...otherCountries]).map((c) => ({
      id: c.alpha2,
      content: c.name,
    })),
    illustration: <MapEmbed country={country} />,
  };
}

export function getReverseMapQuestion(filter: Filter<Country>): Question {
  const { country, otherCountries } = getQuestionCountriesByRegion(filter);

  return {
    category: QuestionCategory.Map,
    title: "Where is " + country.name + "?",
    answer: { id: country.alpha2, content: <MapEmbed country={country} /> },
    choices: randomize([country, ...otherCountries]).map((c) => ({
      id: c.alpha2,
      content: <MapEmbed country={c} />,
    })),
  };
}
