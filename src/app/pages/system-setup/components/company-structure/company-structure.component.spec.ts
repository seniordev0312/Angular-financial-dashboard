import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyStructureComponent } from './company-structure.component';

describe('CompanyStructureComponent', () => {
  let component: CompanyStructureComponent;
  let fixture: ComponentFixture<CompanyStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyStructureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
