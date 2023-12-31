import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessComponent } from './guess.component';

describe('GuessComponent', () => {
  let component: GuessComponent;
  let fixture: ComponentFixture<GuessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuessComponent],
    });
    fixture = TestBed.createComponent(GuessComponent);
    component = fixture.componentInstance;
    component.guess = { guess: 'hello', result: [] };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
