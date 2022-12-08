import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemClaimsComponent } from './system-claims.component';

describe('SystemClaimsComponent', () => {
  let component: SystemClaimsComponent;
  let fixture: ComponentFixture<SystemClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemClaimsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
