export enum GuessResult {
  CORRECT = 1,
  INCORRECT = 0,
  INCORRECT_SEQUENCE = 2,
}

export interface Guess {
  guess: string;
  result: GuessResult[];
}

export abstract class AppPreferences {
  maxGuesses: number = 6;
  maxWordCache: number = 25;
}
