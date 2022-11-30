import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInsuranceUnderwritingComponent } from './general-insurance-underwriting.component';

describe('GeneralInsuranceUnderwritingComponent', () => {
  let component: GeneralInsuranceUnderwritingComponent;
  let fixture: ComponentFixture<GeneralInsuranceUnderwritingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralInsuranceUnderwritingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralInsuranceUnderwritingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
