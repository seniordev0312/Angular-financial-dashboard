import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectListWithChipsComponent } from './select-list-with-chips.component';

describe('SelectListWithChipsComponent', () => {
  let component: SelectListWithChipsComponent;
  let fixture: ComponentFixture<SelectListWithChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectListWithChipsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SelectListWithChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
