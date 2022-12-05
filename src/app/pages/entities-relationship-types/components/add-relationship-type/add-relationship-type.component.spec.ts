import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRelationshipTypeComponent } from './add-relationship-type.component';

describe('AddRelationshipTypeComponent', () => {
  let component: AddRelationshipTypeComponent;
  let fixture: ComponentFixture<AddRelationshipTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRelationshipTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRelationshipTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
