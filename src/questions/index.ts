import { getRandomItem } from "../util/array";
import { getCapitalQuestion, getReverseCapitalQuestion } from "./capitals";
import { getDrivingSideQuestion } from "./driving";
import { getFlagQuestion, getReverseFlagQuestion } from "./flags";
import { getTldQuestion, getReverseTldQuestion } from "./tld";

const getters = [
  getFlagQuestion,
  getReverseFlagQuestion,
  getCapitalQuestion,
  getReverseCapitalQuestion,
  getDrivingSideQuestion,
  getTldQuestion,
  getReverseTldQuestion,
];

export function getQuestion() {
  const randomGetter = getRandomItem(getters);

  return randomGetter();
}
