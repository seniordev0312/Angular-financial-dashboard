import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrespondenceManagementComponent } from './correspondence-management.component';

describe('CorrespondenceManagementComponent', () => {
  let component: CorrespondenceManagementComponent;
  let fixture: ComponentFixture<CorrespondenceManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrespondenceManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrespondenceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
