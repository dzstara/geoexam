import { useCallback, useState } from "react";
import { getQuestion } from "../questions";
import { TrainingOptions } from "../types";

interface QuestionsProps {
  trainingOptions: TrainingOptions;
}

export function Questions(props: QuestionsProps) {
  const getQuestionsWithOptions = useCallback(
    () => getQuestion(props.trainingOptions),
    [props.trainingOptions]
  );

  const [question, setQuestion] = useState(getQuestionsWithOptions());
  const [answer, setAnswer] = useState<string | null>(null);

  return (
    <>
      <p>Category: {question.category}</p>

      {question.illustration}

      <p>{question.title}</p>

      {answer ? (
        <>
          {answer === question.answer.id ? (
            <p>
              <div>Answer: {question.answer.content}</div>

              <p>
                <strong>Correct!</strong>
              </p>
            </p>
          ) : (
            <p>
              Incorrect, the answer was{" "}
              <strong>{question.answer.content}</strong>
            </p>
          )}

          <button
            onClick={() => {
              setQuestion(getQuestionsWithOptions());
              setAnswer(null);
            }}
          >
            Next question
          </button>
        </>
      ) : (
        <>
          <ul>
            {question.choices.map((c) => (
              <li key={c.id}>
                <button onClick={() => setAnswer(c.id)}>{c.content}</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
