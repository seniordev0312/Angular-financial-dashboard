import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesViewerComponent } from './entities-viewer.component';

describe('EntitiesViewerComponent', () => {
  let component: EntitiesViewerComponent;
  let fixture: ComponentFixture<EntitiesViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntitiesViewerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EntitiesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
