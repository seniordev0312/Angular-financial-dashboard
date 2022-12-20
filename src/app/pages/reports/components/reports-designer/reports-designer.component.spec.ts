import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsDesignerComponent } from './reports-designer.component';

describe('ReportsDesignerComponent', () => {
  let component: ReportsDesignerComponent;
  let fixture: ComponentFixture<ReportsDesignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsDesignerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
