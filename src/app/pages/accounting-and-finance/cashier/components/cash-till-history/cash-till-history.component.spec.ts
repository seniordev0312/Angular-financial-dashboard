import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashTillHistoryComponent } from './cash-till-history.component';

describe('CashTillHistoryComponent', () => {
  let component: CashTillHistoryComponent;
  let fixture: ComponentFixture<CashTillHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashTillHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashTillHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
