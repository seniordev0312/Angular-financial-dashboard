import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutcomeAccordionComponent } from './outcome-accordion.component';

describe('OutcomeAccordionComponent', () => {
  let component: OutcomeAccordionComponent;
  let fixture: ComponentFixture<OutcomeAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutcomeAccordionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutcomeAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
