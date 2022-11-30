import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalInsuranceUnderwritingComponent } from './medical-insurance-underwriting.component';

describe('MedicalInsuranceUnderwritingComponent', () => {
  let component: MedicalInsuranceUnderwritingComponent;
  let fixture: ComponentFixture<MedicalInsuranceUnderwritingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalInsuranceUnderwritingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalInsuranceUnderwritingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
