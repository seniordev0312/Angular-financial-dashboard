import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBasketAdvancedComponent } from './view-basket-advanced.component';

describe('ViewBasketAdvancedComponent', () => {
  let component: ViewBasketAdvancedComponent;
  let fixture: ComponentFixture<ViewBasketAdvancedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBasketAdvancedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBasketAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
