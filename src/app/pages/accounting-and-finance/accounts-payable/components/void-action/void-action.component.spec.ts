import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoidActionComponent } from './void-action.component';

describe('VoidActionComponent', () => {
  let component: VoidActionComponent;
  let fixture: ComponentFixture<VoidActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoidActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoidActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
