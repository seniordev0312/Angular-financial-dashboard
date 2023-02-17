import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPolicyComponent } from './customer-policy.component';

describe('CustomerPolicyComponent', () => {
  let component: CustomerPolicyComponent;
  let fixture: ComponentFixture<CustomerPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPolicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
