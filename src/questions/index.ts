import { getCapitalQuestion, getReverseCapitalQuestion } from "./capitals";
import { getFlagQuestion, getReverseFlagQuestion } from "./flags";

export function getQuestion() {
  const random = Math.floor(Math.random() * 4);

  switch (random) {
    case 0:
      return getFlagQuestion();
    case 1:
      return getReverseFlagQuestion();
    case 2:
      return getCapitalQuestion();
    case 3:
      return getReverseCapitalQuestion();
  }

  throw new Error("Random is misconfigured in getQuestion");
}
