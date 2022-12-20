import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCurrencyChangeComponent } from './edit-currency-change.component';

describe('EditCurrencyChangeComponent', () => {
  let component: EditCurrencyChangeComponent;
  let fixture: ComponentFixture<EditCurrencyChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCurrencyChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCurrencyChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
