import {
  Country,
  Filter,
  Question,
  QuestionCategory,
  TrainingOptions,
} from "../types";
import { combineFilterFns, getRandomItem } from "../util/array";
import { getCapitalQuestion, getReverseCapitalQuestion } from "./capitals";
import { getCoverageQuestion } from "./coverage";
import { getDrivingSideQuestion } from "./driving";
import { getFlagQuestion, getReverseFlagQuestion } from "./flags";
import { getMapQuestion, getReverseMapQuestion } from "./map";
import { getTldQuestion, getReverseTldQuestion } from "./tld";

export function getQuestion(options: TrainingOptions) {
  const filteredGetters = getters.filter((g) =>
    options.categories.includes(g.category)
  );
  const randomGetter = getRandomItem(filteredGetters);
  const filters: Filter<Country>[] = [];

  if (options.onlyCovered) {
    filters.push((c: Country) => c.coverage);
  }

  return randomGetter.getter(combineFilterFns(...filters));
}

const getters: Getter[] = [
  { category: QuestionCategory.Flags, getter: getFlagQuestion },
  { category: QuestionCategory.Flags, getter: getReverseFlagQuestion },
  { category: QuestionCategory.CapitalCities, getter: getCapitalQuestion },
  {
    category: QuestionCategory.CapitalCities,
    getter: getReverseCapitalQuestion,
  },
  { category: QuestionCategory.Coverage, getter: getCoverageQuestion },
  { category: QuestionCategory.DrivingSide, getter: getDrivingSideQuestion },
  { category: QuestionCategory.TLDs, getter: getTldQuestion },
  { category: QuestionCategory.TLDs, getter: getReverseTldQuestion },
  { category: QuestionCategory.Map, getter: getMapQuestion },
  { category: QuestionCategory.Map, getter: getReverseMapQuestion },
];

interface Getter {
  category: QuestionCategory;
  getter: (filters: Filter<Country>) => Question;
}
