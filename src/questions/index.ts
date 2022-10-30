import { getCapitalQuestion, getReverseCapitalQuestion } from "./capitals";
import { getDrivingSideQuestion } from "./driving";
import { getFlagQuestion, getReverseFlagQuestion } from "./flags";

export function getQuestion() {
  const random = Math.floor(Math.random() * 5);

  switch (random) {
    case 0:
      return getFlagQuestion();
    case 1:
      return getReverseFlagQuestion();
    case 2:
      return getCapitalQuestion();
    case 3:
      return getReverseCapitalQuestion();
    case 4:
      return getDrivingSideQuestion();
  }

  throw new Error("Random is misconfigured in getQuestion");
}
