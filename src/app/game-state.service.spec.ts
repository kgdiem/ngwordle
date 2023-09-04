import { TestBed } from '@angular/core/testing';

import { GameStateService } from './game-state.service';
import { AppPreferences } from './types';
import { MockAppPreferences } from './mocks';

describe('GameStateService', () => {
  let service: GameStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AppPreferences,
          useValue: MockAppPreferences,
        },
      ],
    });
    service = TestBed.inject(GameStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('checkGuess', () => {
    it('should return true if the guess is correct', () => {
      service.word = 'hello';
      const guess = 'hello';
      expect(service.checkGuess(guess)).toEqual([1, 1, 1, 1, 1]);
    });

    it('should return correct letters if the guess is incorrect', () => {
      service.word = 'hello';
      const guess = 'hella';
      expect(service.checkGuess(guess)).toEqual([1, 1, 1, 1, 0]);
    });

    it('should return correct sequence if letters are in the wrong order', () => {
      service.word = 'hello';
      const guess = 'ehllo';
      expect(service.checkGuess(guess)).toEqual([2, 2, 1, 1, 1]);
    });

    it('should return incorrect if the letter is not in the word', () => {
      service.word = 'hello';
      const guess = 'abcdn';
      expect(service.checkGuess(guess)).toEqual([0, 0, 0, 0, 0]);
    });

    it('should return correct sequence when first letter is in wrong sequence', () => {
      service.word = 'hello';
      const guess = 'oellh';
      expect(service.checkGuess(guess)).toEqual([2, 1, 1, 1, 2]);
    });

    it('should return correct sequence for word', () => {
      service.word = 'uniat';
      let guess = 'grind';

      expect(service.checkGuess(guess)).toEqual([0, 0, 1, 2, 0]);

      guess = 'slink';

      expect(service.checkGuess(guess)).toEqual([0, 0, 1, 2, 0]);

      guess = 'shine';

      expect(service.checkGuess(guess)).toEqual([0, 0, 1, 2, 0]);
    });
  });

  describe('guess', () => {
    it('should not allow guesses after the game is over', () => {
      service.gameIsOver = true;
      service.guess();
      expect(service.guessIndex).toEqual(0);
    });

    it('should not allow guesses with less than 5 letters', () => {
      service.guesses[0].guess = 'abcd';
      service.guess();
      expect(service.guessIndex).toEqual(0);
    });

    it('should increment the guess index', () => {
      service.guesses[0].guess = 'abcde';
      service.guess();
      expect(service.guessIndex).toEqual(1);
    });

    it('should set the result of the guess', () => {
      service.word = 'hello';
      service.guesses[0].guess = 'hello';
      service.guess();
      expect(service.guesses[0].result).toEqual([1, 1, 1, 1, 1]);
    });

    it('should set the game result to true if the guess is correct', () => {
      service.word = 'hello';
      service.guesses[0].guess = 'hello';
      service.guess();
      expect(service.gameResult).toEqual(true);
    });

    it('should set the game result to false if the guess is incorrect', () => {
      service.word = 'hello';
      service.guesses[0].guess = 'hella';
      service.guess();
      expect(service.gameResult).toEqual(false);
    });

    it('should set the game is over if the guess is incorrect', () => {
      service.word = 'hello';
      service.guessIndex = 5;
      service.guesses[5].guess = 'hella';
      service.guess();
      expect(service.gameIsOver).toEqual(true);
      expect(service.gameResult).toEqual(false);
    });
  });

  describe('restart', () => {
    it('should reset the game', () => {
      service.word = 'hello';
      service.guessIndex = 5;
      service.guesses[5].guess = 'hella';
      service.gameIsOver = true;
      service.gameResult = false;
      service.restart();
      expect(service.word).not.toEqual('hello');
      expect(service.guessIndex).toEqual(0);
      expect(service.guesses[5].guess).toEqual('');
      expect(service.gameIsOver).toEqual(false);
      expect(service.gameResult).toEqual(false);
    });
  });
});
