import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceRenewalsComponent } from './insurance-renewals.component';

describe('InsuranceRenewalsComponent', () => {
  let component: InsuranceRenewalsComponent;
  let fixture: ComponentFixture<InsuranceRenewalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceRenewalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceRenewalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
