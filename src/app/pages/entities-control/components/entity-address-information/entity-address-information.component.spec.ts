import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityAddressInformationComponent } from './entity-address-information.component';

describe('EntityAddressInformationComponent', () => {
  let component: EntityAddressInformationComponent;
  let fixture: ComponentFixture<EntityAddressInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityAddressInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityAddressInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
