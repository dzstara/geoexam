import { getRandomCountry } from "../data/country";
import { Question, QuestionCategory } from "../types";

export function getCoverageQuestion(): Question {
  const country = getRandomCountry();

  return {
    category: QuestionCategory.Coverage,
    title: "Is " + country.name + " covered by Google Street View?",
    answer: {
      id: country.coverage.toString(),
      content: country.coverage ? "true" : "false",
    },
    choices: [
      { id: "true", content: "True" },
      { id: "false", content: "False" },
    ],
  };
}
