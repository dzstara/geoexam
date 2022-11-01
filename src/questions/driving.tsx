import { MapEmbed } from "../components/MapEmbed";
import { getRandomCountry } from "../data/country";
import { Country, Filter, Question, QuestionCategory } from "../types";

export function getDrivingSideQuestion(filter: Filter<Country>): Question {
  const country = getRandomCountry(filter);

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
    illustration: <MapEmbed country={country} />,
  };
}
