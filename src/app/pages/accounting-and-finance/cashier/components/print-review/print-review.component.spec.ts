import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintReviewComponent } from './print-review.component';

describe('PrintReviewComponent', () => {
  let component: PrintReviewComponent;
  let fixture: ComponentFixture<PrintReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
