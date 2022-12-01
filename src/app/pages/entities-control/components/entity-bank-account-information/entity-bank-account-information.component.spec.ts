import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityBankAccountInformationComponent } from './entity-bank-account-information.component';

describe('EntityBankAccountInformationComponent', () => {
  let component: EntityBankAccountInformationComponent;
  let fixture: ComponentFixture<EntityBankAccountInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityBankAccountInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityBankAccountInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
