import { useState } from "react";
import { Questions } from "./Questions";

export function App() {
  const [start, setStart] = useState(false);

  return start ? (
    <Questions />
  ) : (
    <>
      <h1>Geoexam</h1>

      <p>Training for GeoGuessr</p>

      <button onClick={() => setStart(true)}>Start</button>
    </>
  );
}
