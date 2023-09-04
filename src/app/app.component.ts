import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { WordService } from './word.service';
import { Guess } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'ngwordle';
  guessIndex = 0;
  gameIsOver = false;
  gameResult = false;
  maxGuesses = 6;
  guesses: Guess[] = new Array(this.maxGuesses).fill('').map(() => ({
    guess: '',
    result: new Array(5).fill(undefined),
  }));

  word = this.wordService.getRandomWord();

  @ViewChild('guessInput') guessInput: ElementRef | null = null;

  constructor(private wordService: WordService) {}

  ngAfterViewInit(): void {
    this.forceFocus();
  }

  forceFocus() {
    this.guessInput?.nativeElement.focus();
  }

  restart() {
    this.guessIndex = 0;
    this.gameIsOver = false;
    this.gameResult = false;
    this.guesses = new Array(this.maxGuesses).fill('').map(() => ({
      guess: '',
      result: new Array(5).fill(undefined),
    }));
    this.word = this.wordService.getRandomWord();

    // TODO: this is a hack to get the focus to work
    setTimeout(() => this.forceFocus(), 0);
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
    const result = this.wordService.checkGuess(guess.guess, this.word);

    guess.result = result;

    if (result.reduce((acc, curr) => acc && curr === 1, true) === true) {
      this.gameResult = true;
      this.gameIsOver = true;
    }

    const nextGuessIndex = this.guessIndex + 1;

    if (nextGuessIndex >= this.maxGuesses) {
      this.gameResult = false;
      this.gameIsOver = true;
    } else {
      this.guessIndex = nextGuessIndex;
    }
  }
}
