import { Injectable } from '@angular/core';
import words from '../assets/words.json';
import { GuessResult } from './types';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  constructor() {}

  getRandomWord() {
    const index = Math.floor(Math.random() * words.length);
    return words[index];
  }

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
