import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailContentComponent } from './email-content.component';

describe('EmailContentComponent', () => {
  let component: EmailContentComponent;
  let fixture: ComponentFixture<EmailContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
