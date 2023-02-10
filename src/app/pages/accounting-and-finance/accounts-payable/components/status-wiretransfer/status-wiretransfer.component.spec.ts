import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusWiretransferComponent } from './status-wiretransfer.component';

describe('StatusWiretransferComponent', () => {
  let component: StatusWiretransferComponent;
  let fixture: ComponentFixture<StatusWiretransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusWiretransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusWiretransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
