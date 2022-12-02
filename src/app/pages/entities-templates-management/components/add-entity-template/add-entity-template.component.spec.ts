import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntityTemplateComponent } from './add-entity-template.component';

describe('AddEntityTemplateComponent', () => {
  let component: AddEntityTemplateComponent;
  let fixture: ComponentFixture<AddEntityTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEntityTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEntityTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
