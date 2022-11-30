import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatyManagementComponent } from './treaty-management.component';

describe('TreatyManagementComponent', () => {
  let component: TreatyManagementComponent;
  let fixture: ComponentFixture<TreatyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatyManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreatyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
