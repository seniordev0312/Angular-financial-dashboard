import { TestBed } from '@angular/core/testing';

import { PolicyCardService } from './policy-card.service';

describe('PolicyCardService', () => {
  let service: PolicyCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolicyCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
