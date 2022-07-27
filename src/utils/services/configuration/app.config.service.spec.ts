import { TestBed } from '@angular/core/testing';

import { App.ConfigService } from './app.config.service';

describe('App.ConfigService', () => {
  let service: App.ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(App.ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
