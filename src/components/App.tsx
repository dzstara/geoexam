import { useCallback, useState } from "react";
import { StartMenu } from "./StartMenu";
import { Questions } from "./Questions";
import { TrainingOptions } from "../types";

export function App() {
  const [trainingOptions, setTrainingOptions] =
    useState<TrainingOptions | null>(null);

  const onStart = useCallback(
    (options: TrainingOptions) => setTrainingOptions(options),
    []
  );

  return !!trainingOptions ? (
    <Questions trainingOptions={trainingOptions} />
  ) : (
    <StartMenu onStart={onStart} />
  );
}
