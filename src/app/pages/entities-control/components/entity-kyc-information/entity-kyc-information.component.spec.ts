import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityKycInformationComponent } from './entity-kyc-information.component';

describe('EntityKycInformationComponent', () => {
  let component: EntityKycInformationComponent;
  let fixture: ComponentFixture<EntityKycInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityKycInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityKycInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
