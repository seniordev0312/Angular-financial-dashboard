import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesSourcesManagementComponent } from './entities-sources-management.component';

describe('EntitiesSourcesManagementComponent', () => {
  let component: EntitiesSourcesManagementComponent;
  let fixture: ComponentFixture<EntitiesSourcesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntitiesSourcesManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntitiesSourcesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
