import { TestBed } from '@angular/core/testing';

import { WordService } from './word.service';

describe('WordService', () => {
  let service: WordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRandomWord', () => {
    it('should return a random word', () => {
      const word = service.getRandomWord();
      expect(word).toBeTruthy();
    });

    it('should return a different word each time', () => {
      const word1 = service.getRandomWord();
      const word2 = service.getRandomWord();
      expect(word1).not.toEqual(word2);
    });
  });

  describe('checkGuess', () => {
    it('should return true if the guess is correct', () => {
      const word = 'hello';
      const guess = 'hello';
      expect(service.checkGuess(guess, word)).toBeTrue();
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
  });
});
