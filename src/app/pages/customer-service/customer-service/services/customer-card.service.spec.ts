import { TestBed } from '@angular/core/testing';

import { CustomerCardService } from './customer-card.service';

describe('CustomerServiceService', () => {
  let service: CustomerCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
