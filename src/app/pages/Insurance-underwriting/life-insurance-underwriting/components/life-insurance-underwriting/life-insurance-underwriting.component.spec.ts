import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeInsuranceUnderwritingComponent } from './life-insurance-underwriting.component';

describe('LifeInsuranceUnderwritingComponent', () => {
  let component: LifeInsuranceUnderwritingComponent;
  let fixture: ComponentFixture<LifeInsuranceUnderwritingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeInsuranceUnderwritingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifeInsuranceUnderwritingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
