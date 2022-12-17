import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailChatComponent } from './email-chat.component';

describe('EmailChatComponent', () => {
  let component: EmailChatComponent;
  let fixture: ComponentFixture<EmailChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
