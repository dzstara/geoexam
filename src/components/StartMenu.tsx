import { useForm } from "react-hook-form";
import { QuestionCategory, TrainingOptions } from "../types";

interface StartMenuProps {
  onStart: (options: TrainingOptions) => unknown;
}

export function StartMenu(props: StartMenuProps) {
  const { handleSubmit, register } = useForm<TrainingOptions>({
    defaultValues: {
      categories: options.map((o) => o.value),
      onlyCovered: true,
    },
  });

  return (
    <>
      <h1>GeoExam</h1>

      <p>Training for GeoGuessr</p>

      <p>Which questions do you want to be tested on?</p>

      <form onSubmit={handleSubmit(props.onStart)}>
        <ul>
          {options.map((o) => (
            <li key={o.value}>
              <label>
                <input
                  type="checkbox"
                  value={o.value}
                  {...register("categories")}
                />{" "}
                {o.label}
              </label>
            </li>
          ))}
        </ul>

        <p>
          <label>
            <input type="checkbox" {...register("onlyCovered")} /> Exclude
            countries not covered by Street View
          </label>
        </p>

        <button>Start</button>
      </form>
    </>
  );
}

const options: StartMenuOption[] = [
  { value: QuestionCategory.Capitals, label: "Capitals" },
  { value: QuestionCategory.Coverage, label: "Street-view coverage" },
  { value: QuestionCategory.DrivingSide, label: "Driving side" },
  { value: QuestionCategory.Flags, label: "Flags" },
  { value: QuestionCategory.Map, label: "Maps" },
  { value: QuestionCategory.TLDs, label: "Top-level domains" },
];

interface StartMenuOption {
  value: QuestionCategory;
  label: string;
}
