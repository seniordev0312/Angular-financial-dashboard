import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEntityMatchPercentageComponent } from './new-entity-match-percentage.component';

describe('NewEntityMatchPercentageComponent', () => {
  let component: NewEntityMatchPercentageComponent;
  let fixture: ComponentFixture<NewEntityMatchPercentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEntityMatchPercentageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEntityMatchPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
