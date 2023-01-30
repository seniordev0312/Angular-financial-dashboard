import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayableStatusComponent } from './payable-status.component';

describe('PayableStatusComponent', () => {
  let component: PayableStatusComponent;
  let fixture: ComponentFixture<PayableStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayableStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayableStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
