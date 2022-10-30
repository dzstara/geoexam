import { getFlagQuestion, getReverseFlagQuestion } from "./flags";

export function getQuestion() {
  const random = Math.floor(Math.random() * 2);

  switch (random) {
    case 0:
      return getFlagQuestion();
    case 1:
      return getReverseFlagQuestion();
  }

  throw new Error("Random is misconfigured in getQuestion");
}
