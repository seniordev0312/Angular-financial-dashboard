import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingInformaitonCardComponent } from './pending-informaiton-card.component';

describe('PendingInformaitonCardComponent', () => {
  let component: PendingInformaitonCardComponent;
  let fixture: ComponentFixture<PendingInformaitonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingInformaitonCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingInformaitonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
