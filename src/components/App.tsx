import { useState } from "react";
import { getFlagQuestion } from "../questions/flags";

export function App() {
  const [question, setQuestion] = useState(getFlagQuestion());
  const [answer, setAnswer] = useState<string | null>(null);

  return (
    <>
      {question.image && <img src={question.image} alt="Flag of a country" />}

      {answer ? (
        <>
          {answer === question.answer.id ? (
            <p>
              <strong>Correct!</strong>
            </p>
          ) : (
            <p>
              Incorrect, the answer was{" "}
              <strong>{question.answer.content}</strong>
            </p>
          )}

          <button
            onClick={() => {
              setQuestion(getFlagQuestion());
              setAnswer(null);
            }}
          >
            Next question
          </button>
        </>
      ) : (
        <>
          <p>{question.title}</p>

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
