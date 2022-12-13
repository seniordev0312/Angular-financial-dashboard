import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChartOfAccountsComponent } from './add-chart-of-accounts.component';

describe('AddChartOfAccountsComponent', () => {
  let component: AddChartOfAccountsComponent;
  let fixture: ComponentFixture<AddChartOfAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChartOfAccountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChartOfAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
