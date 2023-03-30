import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssentifyProcessingComponent } from './assentify-processing.component';

describe('AssentifyProcessingComponent', () => {
  let component: AssentifyProcessingComponent;
  let fixture: ComponentFixture<AssentifyProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssentifyProcessingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssentifyProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
