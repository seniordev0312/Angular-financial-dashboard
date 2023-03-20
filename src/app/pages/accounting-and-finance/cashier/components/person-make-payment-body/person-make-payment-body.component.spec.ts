import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMakePaymentBodyComponent } from './person-make-payment-body.component';

describe('PersonMakePaymentBodyComponent', () => {
  let component: PersonMakePaymentBodyComponent;
  let fixture: ComponentFixture<PersonMakePaymentBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonMakePaymentBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonMakePaymentBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
