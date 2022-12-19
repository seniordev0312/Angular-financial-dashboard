import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { EmailsService } from '../../services/emails.service';
import { emailsMessages$ } from '../../store/emails.store';

@Component({
  selector: 'app-email-chat',
  templateUrl: './email-chat.component.html',
  styleUrls: ['./email-chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailChatComponent extends BaseComponent implements OnInit {

  @Output() closeEmailChatEvent: EventEmitter<void> = new EventEmitter<void>();
  @Input() email: any;
  data: any;

  constructor(
    private emailsService: EmailsService,
    private cdr: ChangeDetectorRef
  ) {
    super()
  }

  ngOnInit(): void {
    this.data = undefined;
    console.log('Email Chat');
    this.emailsService.getEmailMessage(this.email.id);
    this.subscriptions.add(
      emailsMessages$.subscribe(data => {
        console.log(data);
        if (data) {
          this.data = data.message.body
          this.cdr.detectChanges();
        }
      }));
  }

  closeEmailChat(): void {
    this.closeEmailChatEvent.emit();
  }

}
