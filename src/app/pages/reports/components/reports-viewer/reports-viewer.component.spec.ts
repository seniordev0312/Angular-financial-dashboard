import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsViewerComponent } from './reports-viewer.component';

describe('ReportsViewerComponent', () => {
  let component: ReportsViewerComponent;
  let fixture: ComponentFixture<ReportsViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
