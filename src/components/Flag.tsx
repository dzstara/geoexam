interface FlagProps {
  url: string;
  large?: boolean;
}

export function Flag(props: FlagProps) {
  return (
    <img
      key={props.url}
      src={props.url}
      alt="A flag"
      className={
        "aspect-video bg-slate-200 dark:bg-slate-700 p-2 text-transparent " +
        (props.large ? "w-64" : "w-48")
      }
    />
  );
}
