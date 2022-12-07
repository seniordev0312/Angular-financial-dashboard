import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementChipComponent } from './element-chip.component';

describe('ElementChipComponent', () => {
  let component: ElementChipComponent;
  let fixture: ComponentFixture<ElementChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementChipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
