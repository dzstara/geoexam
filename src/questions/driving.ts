import { getRandomCountry } from "../data/country";
import { Question, QuestionCategory } from "../types";

export function getDrivingSideQuestion(): Question {
  const country = getRandomCountry();

  return {
    category: QuestionCategory.DrivingSide,
    title: "What is the driving side of " + country.name + "?",
    answer: {
      id: country.drivingSide,
      content: country.drivingSide === "left" ? "Left" : "Right",
    },
    choices: [
      { id: "left", content: "Left" },
      { id: "right", content: "Right" },
    ],
  };
}
