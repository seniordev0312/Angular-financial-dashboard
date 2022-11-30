import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorInsuranceUnderwritingComponent } from './motor-insurance-underwriting.component';

describe('MotorInsuranceUnderwritingComponent', () => {
  let component: MotorInsuranceUnderwritingComponent;
  let fixture: ComponentFixture<MotorInsuranceUnderwritingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotorInsuranceUnderwritingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotorInsuranceUnderwritingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
