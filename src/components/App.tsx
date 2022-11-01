import { useCallback, useState } from "react";
import { StartMenu } from "./StartMenu";
import { Questions } from "./Questions";
import { TrainingOptions } from "../types";
import { FadeTransition } from "./FadeTransition";

export function App() {
  const [trainingOptions, setTrainingOptions] =
    useState<TrainingOptions | null>(null);

  const onStart = useCallback(
    (options: TrainingOptions) => setTrainingOptions(options),
    []
  );

  return (
    <FadeTransition state={(!!trainingOptions).toString()} speed={400}>
      {!!trainingOptions ? (
        <Questions trainingOptions={trainingOptions} />
      ) : (
        <StartMenu onStart={onStart} />
      )}
    </FadeTransition>
  );
}
