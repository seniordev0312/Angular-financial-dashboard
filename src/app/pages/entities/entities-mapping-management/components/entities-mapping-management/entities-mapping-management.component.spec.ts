import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesMappingManagementComponent } from './entities-mapping-management.component';

describe('EntitiesMappingManagementComponent', () => {
  let component: EntitiesMappingManagementComponent;
  let fixture: ComponentFixture<EntitiesMappingManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntitiesMappingManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntitiesMappingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
