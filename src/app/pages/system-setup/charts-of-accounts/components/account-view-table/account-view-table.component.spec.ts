import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountViewTableComponent } from './account-view-table.component';

describe('AccountViewTableComponent', () => {
  let component: AccountViewTableComponent;
  let fixture: ComponentFixture<AccountViewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountViewTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
