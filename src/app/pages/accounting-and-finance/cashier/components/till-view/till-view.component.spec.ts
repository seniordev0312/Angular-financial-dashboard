import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TillViewComponent } from './till-view.component';

describe('TillViewComponent', () => {
  let component: TillViewComponent;
  let fixture: ComponentFixture<TillViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TillViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TillViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
