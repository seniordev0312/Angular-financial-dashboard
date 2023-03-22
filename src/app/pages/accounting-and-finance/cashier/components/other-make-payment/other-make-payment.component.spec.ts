import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherMakePaymentComponent } from './other-make-payment.component';

describe('OtherMakePaymentComponent', () => {
  let component: OtherMakePaymentComponent;
  let fixture: ComponentFixture<OtherMakePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherMakePaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherMakePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
