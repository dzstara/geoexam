export function clone<T>(input: T): T {
  return structuredClone(input);
}
