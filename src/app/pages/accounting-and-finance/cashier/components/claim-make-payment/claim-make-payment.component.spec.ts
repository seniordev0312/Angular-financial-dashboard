import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimMakePaymentComponent } from './claim-make-payment.component';

describe('ClaimMakePaymentComponent', () => {
  let component: ClaimMakePaymentComponent;
  let fixture: ComponentFixture<ClaimMakePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimMakePaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimMakePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
