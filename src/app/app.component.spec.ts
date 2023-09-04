import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [AppComponent],
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

  describe('guess', () => {
    it('should not allow guesses after the game is over', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.gameIsOver = true;
      app.guess();
      expect(app.guessIndex).toEqual(0);
    });

    it('should not allow guesses with less than 5 letters', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.guesses[0].guess = 'abcd';
      app.guess();
      expect(app.guessIndex).toEqual(0);
    });

    it('should increment the guess index', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.guesses[0].guess = 'abcde';
      app.guess();
      expect(app.guessIndex).toEqual(1);
    });

    it('should set the result of the guess', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.word = 'hello';
      app.guesses[0].guess = 'hello';
      app.guess();
      expect(app.guesses[0].result).toEqual([1, 1, 1, 1, 1]);
    });

    it('should set the game result to true if the guess is correct', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.word = 'hello';
      app.guesses[0].guess = 'hello';
      app.guess();
      expect(app.gameResult).toEqual(true);
    });

    it('should set the game result to false if the guess is incorrect', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.word = 'hello';
      app.guesses[0].guess = 'hella';
      app.guess();
      expect(app.gameResult).toEqual(false);
    });

    it('should set the game is over if the guess is incorrect', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.word = 'hello';
      app.guessIndex = 5;
      app.guesses[5].guess = 'hella';
      app.guess();
      expect(app.gameIsOver).toEqual(true);
      expect(app.gameResult).toEqual(false);
    });
  });

  describe('restart', () => {
    it('should reset the game', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.word = 'hello';
      app.guessIndex = 5;
      app.guesses[5].guess = 'hella';
      app.gameIsOver = true;
      app.gameResult = false;
      app.restart();
      expect(app.word).not.toEqual('hello');
      expect(app.guessIndex).toEqual(0);
      expect(app.guesses[5].guess).toEqual('');
      expect(app.gameIsOver).toEqual(false);
      expect(app.gameResult).toEqual(false);
    });
  });
});
