import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyEditorComponent } from './currency-editor.component';

describe('CurrencyEditorComponent', () => {
  let component: CurrencyEditorComponent;
  let fixture: ComponentFixture<CurrencyEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
