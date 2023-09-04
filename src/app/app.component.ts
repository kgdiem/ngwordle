import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GameStateService } from './game-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'ngwordle';

  @ViewChild('guessInput') guessInput: ElementRef | null = null;

  constructor(private gameService: GameStateService) {}

  ngAfterViewInit(): void {
    this.forceFocus();
  }

  get word() {
    return this.gameService.word;
  }

  get guessIndex() {
    return this.gameService.guessIndex;
  }

  get gameIsOver() {
    return this.gameService.gameIsOver;
  }

  get gameResult() {
    return this.gameService.gameResult;
  }

  get guesses() {
    return this.gameService.guesses;
  }

  forceFocus() {
    this.guessInput?.nativeElement.focus();
  }

  restart() {
    this.gameService.restart();

    // TODO: this is a hack to get the focus to work
    setTimeout(() => this.forceFocus(), 0);
  }

  guess() {
    this.gameService.guess();
  }
}
