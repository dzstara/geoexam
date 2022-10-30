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
