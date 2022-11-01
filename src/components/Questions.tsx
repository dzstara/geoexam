import { useCallback, useState } from "react";
import { getQuestion } from "../questions";
import { TrainingOptions } from "../types";
import { FadeTransition } from "./FadeTransition";
import { QuestionDisplay } from "./QuestionDisplay";

interface QuestionsProps {
  trainingOptions: TrainingOptions;
}

export function Questions(props: QuestionsProps) {
  const getQuestionsWithOptions = useCallback(
    () => ({
      id: Math.random().toString(),
      ...getQuestion(props.trainingOptions),
    }),
    [props.trainingOptions]
  );

  const [question, setQuestion] = useState(getQuestionsWithOptions());

  return (
    <FadeTransition state={question.id} speed={100}>
      <QuestionDisplay
        question={question}
        onNext={() => {
          setQuestion(getQuestionsWithOptions());
        }}
      />
    </FadeTransition>
  );
}
