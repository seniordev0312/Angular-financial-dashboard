import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAccountingComponent } from './general-accounting.component';

describe('GeneralAccountingComponent', () => {
  let component: GeneralAccountingComponent;
  let fixture: ComponentFixture<GeneralAccountingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralAccountingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralAccountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
