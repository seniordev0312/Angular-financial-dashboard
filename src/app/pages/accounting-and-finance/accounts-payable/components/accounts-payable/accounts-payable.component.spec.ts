import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsPayableComponent } from './accounts-payable.component';

describe('AccountsPayableComponent', () => {
  let component: AccountsPayableComponent;
  let fixture: ComponentFixture<AccountsPayableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsPayableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsPayableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
