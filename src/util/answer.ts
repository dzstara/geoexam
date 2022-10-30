import { Country, Answer } from "../types";

export function countryToAnswer(country: Country): Answer {
  return { id: country.alpha2, content: country.name };
}
