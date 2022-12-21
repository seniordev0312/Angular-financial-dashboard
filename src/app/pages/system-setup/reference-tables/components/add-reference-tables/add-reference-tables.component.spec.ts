import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReferenceTablesComponent } from './add-reference-tables.component';

describe('AddReferenceTablesComponent', () => {
  let component: AddReferenceTablesComponent;
  let fixture: ComponentFixture<AddReferenceTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReferenceTablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReferenceTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
