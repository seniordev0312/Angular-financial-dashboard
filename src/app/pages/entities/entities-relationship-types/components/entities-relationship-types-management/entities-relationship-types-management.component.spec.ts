import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesRelationshipTypesManagementComponent } from './entities-relationship-types-management.component';

describe('EntitiesRelationshipTypesManagementComponent', () => {
  let component: EntitiesRelationshipTypesManagementComponent;
  let fixture: ComponentFixture<EntitiesRelationshipTypesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntitiesRelationshipTypesManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntitiesRelationshipTypesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
