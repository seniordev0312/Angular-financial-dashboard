import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceAndReportingComponent } from './finance-and-reporting.component';

describe('FinanceAndReportingComponent', () => {
  let component: FinanceAndReportingComponent;
  let fixture: ComponentFixture<FinanceAndReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceAndReportingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceAndReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
