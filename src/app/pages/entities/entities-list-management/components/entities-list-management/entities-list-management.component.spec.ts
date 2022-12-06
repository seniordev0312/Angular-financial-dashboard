import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesListManagementComponent } from './entities-list-management.component';

describe('EntitiesListManagementComponent', () => {
  let component: EntitiesListManagementComponent;
  let fixture: ComponentFixture<EntitiesListManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntitiesListManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntitiesListManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
