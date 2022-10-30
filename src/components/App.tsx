import { useState } from "react";
import { getQuestion } from "../questions";

export function App() {
  const [question, setQuestion] = useState(getQuestion());
  const [answer, setAnswer] = useState<string | null>(null);

  return (
    <>
      <p>Category: {question.category}</p>

      {question.image && <img src={question.image} alt="Flag of a country" />}

      <p>{question.title}</p>

      {answer ? (
        <>
          {answer === question.answer.id ? (
            <p>
              <div>{question.answer.content}</div>

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
              setQuestion(getQuestion());
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
