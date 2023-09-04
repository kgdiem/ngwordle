import { Component, Input, Optional } from '@angular/core';
import { Guess } from '../types';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.scss'],
})
export class GuessComponent {
  @Input() guess: Guess | undefined = undefined;
}
