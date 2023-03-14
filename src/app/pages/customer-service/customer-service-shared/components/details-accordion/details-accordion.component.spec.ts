import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAccordionComponent } from './details-accordion.component';

describe('DetailsAccordionComponent', () => {
  let component: DetailsAccordionComponent;
  let fixture: ComponentFixture<DetailsAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsAccordionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
