import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewMappingComponent } from './add-new-mapping.component';

describe('AddNewEntityComponent', () => {
  let component: AddNewMappingComponent;
  let fixture: ComponentFixture<AddNewMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewMappingComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddNewMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
