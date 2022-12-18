import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ContactCard } from '../../../chat/models/contact-card.model';
import { MessageType } from '../../../chat/models/enums/message-type';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactCardComponent implements OnInit {

  @Input() contact!: ContactCard;

  constructor() { }

  ngOnInit(): void {
  }

  get isTextMessage() {
    return this.contact.messages[this.contact.messages.length - 1].messageType === MessageType.Text
  };
}
