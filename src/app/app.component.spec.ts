import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockAppPreferences } from './mocks';
import { AppPreferences } from './types';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        {
          provide: AppPreferences,
          useValue: MockAppPreferences,
        },
      ],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ngwordle'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ngwordle');
  });

  it('should initialize with a random word', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.word).toBeTruthy();
  });

  it('should initialize with guesses configured', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.guesses.length).toEqual(6);

    app.guesses.forEach((guess) => {
      expect(guess.guess).toEqual('');
      expect(guess.result.length).toEqual(5);
    });
  });
});
