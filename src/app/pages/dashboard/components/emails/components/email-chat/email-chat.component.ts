import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { EmailsService } from '../../services/emails.service';
import { emailsMessages$ } from '../../store/emails.store';
import { EmailsRepository } from '../../store/emails.repository';
import { isSidenavSpinning$ } from '@root/shared/store/shared.store';
import { Observable } from 'rxjs';

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
  isSpinning$: Observable<boolean>;


  constructor(
    private emailsService: EmailsService,
    private cdr: ChangeDetectorRef,
    private emailsRepository: EmailsRepository,
  ) {
    super()
  }

  ngOnInit(): void {
    this.data = undefined;
    console.log('Email Chat');
    this.emailsRepository.updateEmailMessages(this.email.id, null);
    this.isSpinning$ = isSidenavSpinning$;

    this.emailsService.getEmailMessage(this.email.id);
    this.subscriptions.add(
      emailsMessages$.subscribe(data => {
        if (data) {
          this.data = data.message.body
          this.cdr.detectChanges();
        }
      }));
  }

  CreateEmailByTicket(): void {
    this.emailsService.createTicket(
      {
        entityEmail: this.email.fromEmail,
        sourceId: 1,
        primaryCommunicationChannelId: 1,
        status: 0,
      }
    )
  }

  closeEmailChat(): void {
    this.closeEmailChatEvent.emit();
  }
}