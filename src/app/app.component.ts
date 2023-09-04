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
  guesses: Guess[] = new Array(6).fill('').map(() => ({
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

  guess() {
    const guess = this.guesses[this.guessIndex];

    if (guess.guess.length < 5) {
      // TODO: shake the input box or clear it or something
      return;
    }

    // TODO: check if the guess is correct
    const result = this.wordService.checkGuess(guess.guess, this.word);

    guess.result = result;

    if (result.reduce((acc, curr) => acc && curr === 1, true) === true) {
      // TODO: show the user that they won
    }

    this.guessIndex++;

    // TODO: check if the game is over
  }
}
