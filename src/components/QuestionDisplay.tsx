import { useState } from "react";
import { Question } from "../types";
import { FadeTransition } from "./FadeTransition";
import { QuestionChoices } from "./QuestionChoices";
import { QuestionResult } from "./QuestionResult";

interface QuestionDisplayProps {
  question: Question & { id: string };
  onNext: () => unknown;
}

export function QuestionDisplay(props: QuestionDisplayProps) {
  const [answer, setAnswer] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-stretch text-center md:items-center p-4 md:pt-10">
      <p>Category: {props.question.category}</p>

      <p className="text-xl font-bold mb-5">{props.question.title}</p>

      {props.question.illustration}

      <FadeTransition state={answer ?? ""} speed={100}>
        {answer ? (
          <QuestionResult
            question={props.question}
            answer={answer}
            onNext={props.onNext}
          />
        ) : (
          <QuestionChoices question={props.question} setAnswer={setAnswer} />
        )}
      </FadeTransition>
    </div>
  );
}
