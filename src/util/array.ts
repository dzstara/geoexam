import { Filter } from "../types";

export function getRandomItem<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function intersect<T>(a: T[], b: T[]) {
  return a.filter((value) => b.indexOf(value) > -1);
}

export function randomize<T>(array: T[]) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export function combineFilterFns<T>(
  ...filterFns: (Filter<T> | null | undefined)[]
) {
  const filters = filterFns.filter((f): f is Filter<T> => !!f);

  if (filters.length === 0) return () => true;

  return (a: T) => filters.every((f) => f(a));
}
