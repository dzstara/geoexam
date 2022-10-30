import { Question, QuestionCategory } from "../types";
import { randomize } from "../util/array";
import { getQuestionCountriesByRegion } from "./util";
import { Map } from "../components/Map";

export function getMapQuestion(): Question {
  const { country, otherCountries } = getQuestionCountriesByRegion();

  return {
    category: QuestionCategory.Map,
    title: "What country is this?",
    answer: { id: country.alpha2, content: country.name },
    choices: randomize([country, ...otherCountries]).map((c) => ({
      id: c.alpha2,
      content: c.name,
    })),
    illustration: <Map country={country} />,
  };
}

export function getReverseMapQuestion(): Question {
  const { country, otherCountries } = getQuestionCountriesByRegion();

  return {
    category: QuestionCategory.Map,
    title: "Where is " + country.name + "?",
    answer: { id: country.alpha2, content: <Map country={country} /> },
    choices: randomize([country, ...otherCountries]).map((c) => ({
      id: c.alpha2,
      content: <Map country={c} />,
    })),
  };
}