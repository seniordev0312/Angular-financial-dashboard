import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHistoryComponent } from './edit-history.component';

describe('EditHistoryComponent', () => {
  let component: EditHistoryComponent;
  let fixture: ComponentFixture<EditHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
