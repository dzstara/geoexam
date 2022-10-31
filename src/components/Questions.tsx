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
    <div className="flex flex-col items-stretch text-center md:items-center p-4 md:pt-10">
      <p>Category: {question.category}</p>

      <p className="text-xl font-bold mb-5">{question.title}</p>

      {question.illustration}

      {answer ? (
        <>
          <p className="text-3xl font-black uppercase my-5">
            {answer === question.answer.id ? (
              <strong className="text-green-600">Correct!</strong>
            ) : (
              <strong className="text-red-600">Incorrect</strong>
            )}
          </p>

          <p>The answer was:</p>

          <div>{question.answer.content}</div>

          <button
            className="p-2 px-4 bg-slate-200 dark:bg-slate-700 rounded mt-5"
            onClick={() => {
              setQuestion(getQuestionsWithOptions());
              setAnswer(null);
            }}
          >
            Next question
          </button>
        </>
      ) : (
        <ul className="flex flex-col sm:grid sm:grid-cols-2 items-stretch gap-2 mt-4">
          {question.choices.map((c) => (
            <li key={c.id} className="shrink-0">
              <button
                onClick={() => setAnswer(c.id)}
                className="p-2 px-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded w-full flex items-center justify-center"
              >
                {c.content}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
