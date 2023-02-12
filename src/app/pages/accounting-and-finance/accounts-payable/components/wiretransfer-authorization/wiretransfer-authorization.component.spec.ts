import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WiretransferAuthorizationComponent } from './wiretransfer-authorization.component';

describe('WiretransferAuthorizationComponent', () => {
  let component: WiretransferAuthorizationComponent;
  let fixture: ComponentFixture<WiretransferAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WiretransferAuthorizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WiretransferAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
