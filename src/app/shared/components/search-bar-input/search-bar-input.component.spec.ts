import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarInputComponent } from './search-bar-input.component';

describe('SearchBarInputComponent', () => {
  let component: SearchBarInputComponent;
  let fixture: ComponentFixture<SearchBarInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBarInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBarInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
