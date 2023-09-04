import { Injectable } from '@angular/core';
import words from '../assets/words.json';
import { GuessResult } from './types';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  constructor() {}

  getRandomWord() {
    const index = Math.floor(Math.random() * words.length);
    return words[index];
  }
}
