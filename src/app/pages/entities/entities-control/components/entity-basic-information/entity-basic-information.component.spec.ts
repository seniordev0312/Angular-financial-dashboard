import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityBasicInformationComponent } from './entity-basic-information.component';

describe('EntityBasicInformationComponent', () => {
  let component: EntityBasicInformationComponent;
  let fixture: ComponentFixture<EntityBasicInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityBasicInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityBasicInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
