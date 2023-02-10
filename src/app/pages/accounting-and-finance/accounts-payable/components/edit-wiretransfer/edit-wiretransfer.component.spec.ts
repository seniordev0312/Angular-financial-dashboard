import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWiretransferComponent } from './edit-wiretransfer.component';

describe('EditWiretransferComponent', () => {
  let component: EditWiretransferComponent;
  let fixture: ComponentFixture<EditWiretransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWiretransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWiretransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
