import { QuestionCategory, TrainingOptions } from "../types";
import { getRandomItem } from "../util/array";
import { getCapitalQuestion, getReverseCapitalQuestion } from "./capitals";
import { getCoverageQuestion } from "./coverage";
import { getDrivingSideQuestion } from "./driving";
import { getFlagQuestion, getReverseFlagQuestion } from "./flags";
import { getMapQuestion, getReverseMapQuestion } from "./map";
import { getTldQuestion, getReverseTldQuestion } from "./tld";

const getters = [
  { category: QuestionCategory.Flags, getter: getFlagQuestion },
  { category: QuestionCategory.Flags, getter: getReverseFlagQuestion },
  { category: QuestionCategory.Capitals, getter: getCapitalQuestion },
  { category: QuestionCategory.Capitals, getter: getReverseCapitalQuestion },
  { category: QuestionCategory.Coverage, getter: getCoverageQuestion },
  { category: QuestionCategory.DrivingSide, getter: getDrivingSideQuestion },
  { category: QuestionCategory.TLDs, getter: getTldQuestion },
  { category: QuestionCategory.TLDs, getter: getReverseTldQuestion },
  { category: QuestionCategory.Map, getter: getMapQuestion },
  { category: QuestionCategory.Map, getter: getReverseMapQuestion },
];

export function getQuestion(options: TrainingOptions) {
  const filteredGetters = getters.filter((g) =>
    options.categories.includes(g.category)
  );
  const randomGetter = getRandomItem(filteredGetters);

  return randomGetter.getter();
}
