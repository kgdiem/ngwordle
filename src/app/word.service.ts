import { Injectable } from '@angular/core';
import words from '../assets/words.json';
import { StorageService } from './storage.service';
import { AppPreferences } from './types';

const WORD_CACHE_KEY = 'words';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  constructor(
    private storage: StorageService,
    private appPreferences: AppPreferences
  ) {}

  getRandomWord(): string {
    const pastWords = this.storage.get(WORD_CACHE_KEY) as number[];

    const index = Math.floor(Math.random() * words.length);

    if (pastWords) {
      if (pastWords.includes(index)) {
        return this.getRandomWord();
      } else if (pastWords.length >= this.appPreferences.maxWordCache) {
        pastWords.shift();
        pastWords.push(index);
      } else {
        pastWords.push(index);
      }

      this.storage.set(WORD_CACHE_KEY, pastWords);
    } else {
      this.storage.set(WORD_CACHE_KEY, [index]);
    }

    return words[index];
  }
}
