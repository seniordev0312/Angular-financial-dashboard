import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyRenewalsCustomerServiceTicketComponent } from './policy-renewals-customer-service-ticket.component';

describe('PolicyRenewalsCustomerServiceTicketComponent', () => {
  let component: PolicyRenewalsCustomerServiceTicketComponent;
  let fixture: ComponentFixture<PolicyRenewalsCustomerServiceTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyRenewalsCustomerServiceTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyRenewalsCustomerServiceTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
