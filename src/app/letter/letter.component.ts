import { Component, Input } from '@angular/core';
import { GuessResult } from '../types';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
})
export class LetterComponent {
  @Input() letter: string | undefined = undefined;
  @Input() result: number | undefined = undefined;

  private defaultClasses = [
    'h-full flex items-center justify-center bg-cyan-50',
  ];

  get classes(): string[] {
    if (this.result === undefined) {
      return [...this.defaultClasses];
    }

    switch (this.result) {
      case GuessResult.INCORRECT:
        return [...this.defaultClasses, 'bg-gray-100'];
      case GuessResult.CORRECT:
        return [...this.defaultClasses, 'bg-emerald-100'];
      case GuessResult.INCORRECT_SEQUENCE:
        return [...this.defaultClasses, 'bg-yellow-200'];
      default:
        return [];
    }
  }
}
