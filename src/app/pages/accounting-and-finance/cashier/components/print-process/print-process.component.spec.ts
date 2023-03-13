import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintProcessComponent } from './print-process.component';

describe('PrintProcessComponent', () => {
  let component: PrintProcessComponent;
  let fixture: ComponentFixture<PrintProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
