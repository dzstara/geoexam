import { Question } from "../types";

interface QuestionChoicesProps {
  question: Question;
  setAnswer: (answerId: string) => unknown;
}

export function QuestionChoices(props: QuestionChoicesProps) {
  return (
    <ul className="flex flex-col sm:grid sm:grid-cols-2 items-stretch gap-2 mt-4">
      {props.question.choices.map((c) => (
        <li key={c.id} className="shrink-0">
          <button
            onClick={() => props.setAnswer(c.id)}
            className="p-2 px-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded w-full flex items-center justify-center"
          >
            {c.content}
          </button>
        </li>
      ))}
    </ul>
  );
}
