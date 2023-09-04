export enum GuessResult {
  CORRECT = 1,
  INCORRECT = 0,
  INCORRECT_SEQUENCE = 2,
}

export interface Guess {
  guess: string;
  result: GuessResult[];
}
