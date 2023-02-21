import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBasketComponent } from './view-basket.component';

describe('ViewBasketComponent', () => {
  let component: ViewBasketComponent;
  let fixture: ComponentFixture<ViewBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBasketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
