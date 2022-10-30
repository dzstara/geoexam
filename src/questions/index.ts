import { getRandomItem } from "../util/array";
import { getCapitalQuestion, getReverseCapitalQuestion } from "./capitals";
import { getDrivingSideQuestion } from "./driving";
import { getFlagQuestion, getReverseFlagQuestion } from "./flags";
import { getMapQuestion, getReverseMapQuestion } from "./map";
import { getTldQuestion, getReverseTldQuestion } from "./tld";

const getters = [
  getFlagQuestion,
  getReverseFlagQuestion,
  getCapitalQuestion,
  getReverseCapitalQuestion,
  getDrivingSideQuestion,
  getTldQuestion,
  getReverseTldQuestion,
  getMapQuestion,
  getReverseMapQuestion,
];

export function getQuestion() {
  const randomGetter = getRandomItem(getters);

  return randomGetter();
}
