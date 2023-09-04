import { TestBed } from '@angular/core/testing';

import { WordService } from './word.service';
import { AppPreferences } from './types';
import { MockAppPreferences } from './mocks';
import { StorageService } from './storage.service';
import words from '../assets/words.json';

describe('WordService', () => {
  let service: WordService;
  let values: number[] | null;

  beforeEach(() => {
    values = [];

    TestBed.configureTestingModule({
      providers: [
        {
          provide: AppPreferences,
          useValue: {
            ...MockAppPreferences,
            maxWordCache: 2,
          },
        },
        {
          provide: StorageService,
          useValue: {
            get: (key: string) => values,
            set: (key: string, value: number[]) => (values = value),
          },
        },
      ],
    });
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

    describe('caching', () => {
      it('should work with no cache', () => {
        values = null;

        const word1 = service.getRandomWord();

        expect(values).toBeTruthy();
        expect(values).toBeInstanceOf(Array);

        // @ts-ignore
        expect(values?.length).toEqual(1);
        // @ts-ignore
        expect(values?.[0]).toEqual(words.indexOf(word1));
      });

      it('should cache words', () => {
        const word1 = service.getRandomWord();

        expect(values).toBeTruthy();
        expect(values?.length).toEqual(1);
        expect(values?.[0]).toEqual(words.indexOf(word1));
      });

      it('should keep cache of words limited to app preferences', () => {
        const word1 = service.getRandomWord();
        const word2 = service.getRandomWord();

        expect(values).toBeTruthy();
        expect(values?.length).toEqual(2);

        expect(values?.[0]).toEqual(words.indexOf(word1));
        expect(values?.[1]).toEqual(words.indexOf(word2));

        const word3 = service.getRandomWord();

        expect(values?.length).toEqual(2);
        expect(values?.[0]).toEqual(words.indexOf(word2));
        expect(values?.[1]).toEqual(words.indexOf(word3));
      });
    });
  });
});
