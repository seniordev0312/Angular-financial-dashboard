import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitySectionComponent } from './entity-section.component';

describe('EntitySectionComponent', () => {
  let component: EntitySectionComponent;
  let fixture: ComponentFixture<EntitySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntitySectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntitySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
