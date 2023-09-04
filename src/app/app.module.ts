import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { GuessComponent } from './guess/guess.component';
import { LetterComponent } from './letter/letter.component';
import { AppPreferences } from './types';

@NgModule({
  declarations: [AppComponent, GuessComponent, LetterComponent],
  imports: [BrowserModule, FormsModule],
  providers: [
    {
      provide: AppPreferences,
      useValue: {
        maxGuesses: 6,
        maxWordCache: 25,
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
