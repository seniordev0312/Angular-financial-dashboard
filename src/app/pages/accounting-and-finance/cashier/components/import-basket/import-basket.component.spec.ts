import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportBasketComponent } from './import-basket.component';

describe('ImportBasketComponent', () => {
  let component: ImportBasketComponent;
  let fixture: ComponentFixture<ImportBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportBasketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
