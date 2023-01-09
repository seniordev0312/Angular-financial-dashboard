import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServiceTicketComponent } from './customer-service-ticket.component';

describe('CustomerServiceTicketComponent', () => {
  let component: CustomerServiceTicketComponent;
  let fixture: ComponentFixture<CustomerServiceTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerServiceTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerServiceTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
