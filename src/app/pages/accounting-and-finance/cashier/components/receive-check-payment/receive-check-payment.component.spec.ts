import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveCheckPaymentComponent } from './receive-check-payment.component';

describe('ReceiveCheckPaymentComponent', () => {
  let component: ReceiveCheckPaymentComponent;
  let fixture: ComponentFixture<ReceiveCheckPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiveCheckPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiveCheckPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
