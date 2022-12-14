import { ReactNode } from "react";
import { Alpha2 } from "./generated-data/alpha2";
import { CurrencyID } from "./generated-data/currencies";

export interface Country {
  name: string;
  alpha2: Alpha2;
  flag: string;
  continents: string[];
  groups: string[];
  capitals: string[];
  drivingSide: "right" | "left";
  phoneCodes: string[];
  tld?: string;
  position: [number, number];
  coverage: boolean;
  currencies: CurrencyID[];
}

export interface Currency {
  name: string;
  symbols: string[];
}

export interface Question {
  category: QuestionCategory;
  title: string;
  answer: Answer;
  choices: Answer[];
  illustration?: ReactNode;
}

type AnswerID = string;

export interface Answer {
  id: AnswerID;
  content: ReactNode;
}

export enum QuestionCategory {
  CapitalCities = "Capital cities",
  Coverage = "Street-view coverage",
  DrivingSide = "Driving side",
  Flags = "Flags",
  TLDs = "TLDs",
  Map = "Map",
}

export interface TrainingOptions {
  categories: QuestionCategory[];
  onlyCovered: boolean;
}

export type Filter<T> = (a: T) => boolean;
