import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocumentTypeComponent } from './add-document-type.component';

describe('AddDocumentTypeComponent', () => {
  let component: AddDocumentTypeComponent;
  let fixture: ComponentFixture<AddDocumentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDocumentTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDocumentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
