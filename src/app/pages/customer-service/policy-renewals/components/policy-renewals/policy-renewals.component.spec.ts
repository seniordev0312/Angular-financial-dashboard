import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyRenewalsComponent } from './policy-renewals.component';

describe('PolicyRenewalsComponent', () => {
  let component: PolicyRenewalsComponent;
  let fixture: ComponentFixture<PolicyRenewalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyRenewalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyRenewalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
