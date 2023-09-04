import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterComponent } from './letter.component';
import { GuessResult } from '../types';

describe('LetterComponent', () => {
  let component: LetterComponent;
  let fixture: ComponentFixture<LetterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LetterComponent],
    });
    fixture = TestBed.createComponent(LetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('classes', () => {
    it('should return default classes if no result', () => {
      component.result = undefined;
      const classes = component.classes;

      expect(classes).toEqual([
        'h-full flex items-center justify-center bg-cyan-50',
      ]);
    });

    it('should return gray if incorrect', () => {
      component.result = GuessResult.INCORRECT;

      const classes = component.classes;

      expect(classes).toContain('bg-gray-100');
    });

    it('should return emerald if correct', () => {
      component.result = GuessResult.CORRECT;

      const classes = component.classes;

      expect(classes).toContain('bg-emerald-100');
    });

    it('should return yellow if incorrect sequence', () => {
      component.result = GuessResult.INCORRECT_SEQUENCE;

      const classes = component.classes;

      expect(classes).toContain('bg-yellow-200');
    });
  });
});
