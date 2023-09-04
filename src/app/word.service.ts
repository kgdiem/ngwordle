import { Injectable } from '@angular/core';
import words from '../assets/words.json';

export enum GuessResult {
  CORRECT = 1,
  INCORRECT = 0,
  INCORRECT_SEQUENCE = 2,
}

@Injectable({
  providedIn: 'root',
})
export class WordService {
  constructor() {}

  getRandomWord() {
    const index = Math.floor(Math.random() * words.length);
    return words[index];
  }

  checkGuess(guess: string, word: string): true | GuessResult[] {
    return true;
  }
}
