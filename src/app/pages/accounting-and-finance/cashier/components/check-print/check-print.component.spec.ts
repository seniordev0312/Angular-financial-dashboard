import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPrintComponent } from './check-print.component';

describe('CheckPrintComponent', () => {
  let component: CheckPrintComponent;
  let fixture: ComponentFixture<CheckPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
