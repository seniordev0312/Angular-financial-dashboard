import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesTemplatesManagementComponent } from './entities-templates-management.component';

describe('EntitiesTemplatesManagementComponent', () => {
  let component: EntitiesTemplatesManagementComponent;
  let fixture: ComponentFixture<EntitiesTemplatesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntitiesTemplatesManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntitiesTemplatesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
