import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintStatusComponent } from './print-status.component';

describe('PrintStatusComponent', () => {
  let component: PrintStatusComponent;
  let fixture: ComponentFixture<PrintStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
