import { useForm } from "react-hook-form";
import { QuestionCategory, TrainingOptions } from "../types";
import { Logo } from "./Logo";

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
    <div className="StartMenu w-full min-h-screen relative flex items-center justify-center flex-col text-[4vmin] md:text-base p-[3vmin]">
      <div className="">
        <div className="text-[4em] mb-[0.3em]">
          <Logo />
        </div>

        <p className="text-center text-[0.8em] text-slate-600 dark:text-slate-300">
          Training for GeoGuessr
        </p>

        <form onSubmit={handleSubmit(props.onStart)} className="my-[2em]">
          <div className="border border-slate-200 dark:border-slate-700 rounded p-2 px-4 bg-gray-50 dark:bg-gray-900">
            <ul className="text-[1em]">
              {options.map((o) => (
                <li key={o.value}>
                  <label className="cursor-pointer">
                    <input
                      type="checkbox"
                      value={o.value}
                      className="align-middle"
                      {...register("categories")}
                    />{" "}
                    <span className="align-middle">{o.label}</span>
                  </label>
                </li>
              ))}
            </ul>

            <hr className="border-t border-slate-200 dark:border-slate-700 my-[1em]" />

            <div className="text-[0.8em]">
              <p>
                <label className="cursor-pointer">
                  <input
                    type="checkbox"
                    className="align-middle"
                    {...register("onlyCovered")}
                  />{" "}
                  <span className="align-middle">
                    Exclude countries not covered by Street View
                  </span>
                </label>
              </p>
            </div>
          </div>

          <button className="block w-full uppercase font-black tracking-tighter text-[2em] text-center mt-[0.5em] py-[.4em] bg-sky-700 text-white  hover:bg-sky-600 border border-sky-900/10 rounded">
            Start
          </button>
        </form>

        <p className="mt-[2em] text-[0.7em] text-center text-slate-400 dark:text-slate-500">
          App from{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://dzstara.xyz"
            className="underline"
          >
            dzstara
          </a>
          , source on{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/dzstara/geoexam"
            className="underline"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </div>
  );
}

const options: StartMenuOption[] = [
  { value: QuestionCategory.CapitalCities, label: "Capital cities" },
  { value: QuestionCategory.DrivingSide, label: "Driving side" },
  { value: QuestionCategory.Flags, label: "Flags" },
  { value: QuestionCategory.Map, label: "Maps" },
  { value: QuestionCategory.Coverage, label: "Street-view coverage" },
  { value: QuestionCategory.TLDs, label: "Top-level domains" },
];

interface StartMenuOption {
  value: QuestionCategory;
  label: string;
}
