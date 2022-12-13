import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerInputComponent } from './date-picker-input.component';

describe('DatePickerInputComponent', () => {
  let component: DatePickerInputComponent;
  let fixture: ComponentFixture<DatePickerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatePickerInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatePickerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
