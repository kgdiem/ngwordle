import { Injectable } from '@angular/core';
import { GuessResult } from './types';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  constructor() {}

  checkGuess(guess: string, word: string): GuessResult[] {
    if (guess === word) {
      return new Array(word.length).fill(GuessResult.CORRECT);
    } else {
      const guessArray = guess.split('');

      const result = word.split('').map((letter, index) => {
        if (guessArray[index] === letter) {
          return GuessResult.CORRECT;
        } else if (guessArray.includes(letter)) {
          return GuessResult.INCORRECT_SEQUENCE;
        } else {
          return GuessResult.INCORRECT;
        }
      });

      return result;
    }
  }
}
