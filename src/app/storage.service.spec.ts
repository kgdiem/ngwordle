import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { AppPreferences } from './types';
import { MockAppPreferences } from './mocks';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AppPreferences,
          useValue: MockAppPreferences,
        },
      ],
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('should return the value from localStorage', () => {
      localStorage.setItem('test', JSON.stringify({ test: 'test' }));

      const value = service.get('test');

      expect(value).toEqual({ test: 'test' });
    });

    it('should return null if the key does not exist', () => {
      const value = service.get('test');

      expect(value).toEqual(null);
    });

    it('should return null if the value is not valid JSON', () => {
      localStorage.setItem('test', 'test');

      const value = service.get('test');

      expect(value).toEqual(null);
    });
  });

  describe('set', () => {
    it('should set the value in localStorage', () => {
      service.set('test', { test: 'test' });

      const value = localStorage.getItem('test');

      expect(value).toEqual(JSON.stringify({ test: 'test' }));
    });
  });

  describe('remove', () => {
    it('should remove the value from localStorage', () => {
      localStorage.setItem('test', JSON.stringify({ test: 'test' }));

      service.remove('test');

      const value = localStorage.getItem('test');

      expect(value).toEqual(null);
    });
  });
});
