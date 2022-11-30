import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceTablesComponent } from './reference-tables.component';

describe('ReferenceTablesComponent', () => {
  let component: ReferenceTablesComponent;
  let fixture: ComponentFixture<ReferenceTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceTablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferenceTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
