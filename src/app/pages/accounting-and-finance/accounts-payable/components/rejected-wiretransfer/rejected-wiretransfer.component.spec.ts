import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedWiretransferComponent } from './rejected-wiretransfer.component';

describe('RejectedWiretransferComponent', () => {
  let component: RejectedWiretransferComponent;
  let fixture: ComponentFixture<RejectedWiretransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedWiretransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedWiretransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
