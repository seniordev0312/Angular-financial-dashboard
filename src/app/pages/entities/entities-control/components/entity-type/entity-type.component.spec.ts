import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityTypeComponent } from './entity-type.component';

describe('EntityTypeComponent', () => {
  let component: EntityTypeComponent;
  let fixture: ComponentFixture<EntityTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
