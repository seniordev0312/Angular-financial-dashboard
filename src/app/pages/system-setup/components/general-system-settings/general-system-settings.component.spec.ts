import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSystemSettingsComponent } from './general-system-settings.component';

describe('GeneralSystemSettingsComponent', () => {
  let component: GeneralSystemSettingsComponent;
  let fixture: ComponentFixture<GeneralSystemSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralSystemSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralSystemSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
