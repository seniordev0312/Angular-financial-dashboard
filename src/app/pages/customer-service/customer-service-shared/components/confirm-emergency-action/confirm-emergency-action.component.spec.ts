import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEmergencyActionComponent } from './confirm-emergency-action.component';

describe('ConfirmEmergencyActionComponent', () => {
  let component: ConfirmEmergencyActionComponent;
  let fixture: ComponentFixture<ConfirmEmergencyActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmEmergencyActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmEmergencyActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
