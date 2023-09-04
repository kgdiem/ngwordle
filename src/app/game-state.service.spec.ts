import { TestBed } from '@angular/core/testing';

import { GameStateService } from './game-state.service';

describe('GameStateService', () => {
  let service: GameStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('checkGuess', () => {
    it('should return true if the guess is correct', () => {
      const word = 'hello';
      const guess = 'hello';
      expect(service.checkGuess(guess, word)).toEqual([1, 1, 1, 1, 1]);
    });

    it('should return correct letters if the guess is incorrect', () => {
      const word = 'hello';
      const guess = 'hella';
      expect(service.checkGuess(guess, word)).toEqual([1, 1, 1, 1, 0]);
    });

    it('should return correct sequence if letters are in the wrong order', () => {
      const word = 'hello';
      const guess = 'ehllo';
      expect(service.checkGuess(guess, word)).toEqual([2, 2, 1, 1, 1]);
    });

    it('should return incorrect if the letter is not in the word', () => {
      const word = 'hello';
      const guess = 'abcdn';
      expect(service.checkGuess(guess, word)).toEqual([0, 0, 0, 0, 0]);
    });

    it('should return correct sequence when first letter is in wrong sequence', () => {
      const word = 'hello';
      const guess = 'oellh';
      expect(service.checkGuess(guess, word)).toEqual([2, 1, 1, 1, 2]);
    });
  });
});
