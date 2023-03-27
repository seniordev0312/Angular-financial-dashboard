import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TillHistoryComponent } from './till-history.component';

describe('TillHistoryComponent', () => {
  let component: TillHistoryComponent;
  let fixture: ComponentFixture<TillHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TillHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TillHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
