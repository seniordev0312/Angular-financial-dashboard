import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayMakePaymentComponent } from './pay-make-payment.component';

describe('PayMakePaymentComponent', () => {
  let component: PayMakePaymentComponent;
  let fixture: ComponentFixture<PayMakePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayMakePaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayMakePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
