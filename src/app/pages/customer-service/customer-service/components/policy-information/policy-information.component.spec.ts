import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyInformationComponent } from './policy-information.component';

describe('PolicyInformationComponent', () => {
  let component: PolicyInformationComponent;
  let fixture: ComponentFixture<PolicyInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
