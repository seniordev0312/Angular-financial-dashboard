import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeColumnsComponent } from './customize-columns.component';

describe('CustomizeColumnsComponent', () => {
  let component: CustomizeColumnsComponent;
  let fixture: ComponentFixture<CustomizeColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizeColumnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomizeColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
