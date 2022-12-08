import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSetupEmptyPageComponent } from './system-setup-empty-page.component';

describe('SystemSetupEmptyPageComponent', () => {
  let component: SystemSetupEmptyPageComponent;
  let fixture: ComponentFixture<SystemSetupEmptyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SystemSetupEmptyPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SystemSetupEmptyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
