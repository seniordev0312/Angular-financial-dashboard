import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDepositedHistoryComponent } from './view-deposited-history.component';

describe('ViewDepositedHistoryComponent', () => {
  let component: ViewDepositedHistoryComponent;
  let fixture: ComponentFixture<ViewDepositedHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDepositedHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDepositedHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
