import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesFlowComponent } from './sales-flow.component';

describe('SalesFlowComponent', () => {
  let component: SalesFlowComponent;
  let fixture: ComponentFixture<SalesFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
