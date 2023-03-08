import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveCashPaymentComponent } from './receive-cash-payment.component';

describe('ReceiveCashPaymentComponent', () => {
  let component: ReceiveCashPaymentComponent;
  let fixture: ComponentFixture<ReceiveCashPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiveCashPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiveCashPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
