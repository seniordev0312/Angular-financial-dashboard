import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicySortComponent } from './policy-sort.component';

describe('PolicySortComponent', () => {
  let component: PolicySortComponent;
  let fixture: ComponentFixture<PolicySortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicySortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicySortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
