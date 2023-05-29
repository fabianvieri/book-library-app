import { TestBed } from '@angular/core/testing';

import { LoanHttpService } from './loan-http.service';

describe('LoanHttpService', () => {
  let service: LoanHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
