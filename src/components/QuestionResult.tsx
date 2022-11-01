import { Question } from "../types";

interface QuestionResultProps {
  question: Question;
  answer: string;
  onNext: () => unknown;
}

export function QuestionResult(props: QuestionResultProps) {
  return (
    <>
      <p className="text-3xl font-black uppercase my-5">
        {props.answer === props.question.answer.id ? (
          <strong className="text-green-600">Correct!</strong>
        ) : (
          <strong className="text-red-600">Incorrect</strong>
        )}
      </p>

      <p>The answer was:</p>

      <div>{props.question.answer.content}</div>

      <button
        className="p-2 px-4 bg-slate-200 dark:bg-slate-700 rounded mt-5"
        onClick={() => {
          props.onNext();
        }}
      >
        Next question
      </button>
    </>
  );
}
