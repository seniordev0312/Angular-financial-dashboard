import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesKycDocumentTypesManagementComponent } from './entities-kyc-document-types-management.component';

describe('EntitiesKycDocumentTypesManagementComponent', () => {
  let component: EntitiesKycDocumentTypesManagementComponent;
  let fixture: ComponentFixture<EntitiesKycDocumentTypesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntitiesKycDocumentTypesManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntitiesKycDocumentTypesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
