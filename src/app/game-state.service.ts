import { Injectable } from '@angular/core';
import { AppPreferences, Guess, GuessResult } from './types';
import { WordService } from './word.service';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  word = this.wordService.getRandomWord();
  guessIndex = 0;
  gameIsOver = false;
  gameResult = false;
  guesses: Guess[] = new Array(this.appPreferences.maxGuesses)
    .fill('')
    .map(() => ({
      guess: '',
      result: new Array(5).fill(undefined),
    }));

  constructor(
    private wordService: WordService,
    private appPreferences: AppPreferences
  ) {}

  checkGuess(guess: string): GuessResult[] {
    if (guess === this.word) {
      return new Array(this.word.length).fill(GuessResult.CORRECT);
    } else {
      const guessArray = guess.split('');

      const result = guessArray.map((letter, index) => {
        if (this.word[index] === letter) {
          return GuessResult.CORRECT;
        } else if (this.word.includes(letter)) {
          return GuessResult.INCORRECT_SEQUENCE;
        } else {
          return GuessResult.INCORRECT;
        }
      });

      return result;
    }
  }

  restart() {
    this.word = this.wordService.getRandomWord();
    this.guessIndex = 0;
    this.gameIsOver = false;
    this.gameResult = false;
    this.guesses = new Array(this.appPreferences.maxGuesses)
      .fill('')
      .map(() => ({
        guess: '',
        result: new Array(5).fill(undefined),
      }));
  }

  guess() {
    if (this.gameIsOver) {
      return;
    }

    const guess = this.guesses[this.guessIndex];

    if (guess.guess.length < 5) {
      // TODO: shake the input box or clear it or something
      return;
    }

    // TODO: check if the guess is correct
    const result = this.checkGuess(guess.guess);

    guess.result = result;

    if (result.reduce((acc, curr) => acc && curr === 1, true) === true) {
      this.gameResult = true;
      this.gameIsOver = true;
    }

    const nextGuessIndex = this.guessIndex + 1;

    if (nextGuessIndex >= this.appPreferences.maxGuesses) {
      this.gameResult = false;
      this.gameIsOver = true;
    } else {
      this.guessIndex = nextGuessIndex;
    }
  }
}
