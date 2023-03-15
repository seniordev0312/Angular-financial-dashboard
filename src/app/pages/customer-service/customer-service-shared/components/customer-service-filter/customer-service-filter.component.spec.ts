import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServiceFilterComponent } from './customer-service-filter.component';

describe('PolicyFilterComponent', () => {
  let component: CustomerServiceFilterComponent;
  let fixture: ComponentFixture<CustomerServiceFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerServiceFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerServiceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
