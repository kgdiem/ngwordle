import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'ngwordle';
  guessIndex = 0;
  guesses = new Array(6).fill('');

  @ViewChild('guessInput') guessInput: ElementRef | null = null;

  ngAfterViewInit(): void {
    this.forceFocus();
  }

  forceFocus() {
    this.guessInput?.nativeElement.focus();
  }

  guess() {
    if (this.guesses[this.guessIndex].length < 5) {
      // TODO: shake the input box or clear it or something
      return;
    }

    // TODO: check if the guess is correct
    this.guessIndex++;

    // TODO: check if the game is over
  }
}
