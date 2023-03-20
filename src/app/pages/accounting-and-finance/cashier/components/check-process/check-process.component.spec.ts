import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckProcessComponent } from './check-process.component';

describe('CheckProcessComponent', () => {
  let component: CheckProcessComponent;
  let fixture: ComponentFixture<CheckProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
