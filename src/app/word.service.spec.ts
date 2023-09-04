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
});
