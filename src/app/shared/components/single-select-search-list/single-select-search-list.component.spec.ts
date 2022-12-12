import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSelectSearchListComponent } from './single-select-search-list.component';

describe('SingleSelectSearchListComponent', () => {
  let component: SingleSelectSearchListComponent;
  let fixture: ComponentFixture<SingleSelectSearchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleSelectSearchListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SingleSelectSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
