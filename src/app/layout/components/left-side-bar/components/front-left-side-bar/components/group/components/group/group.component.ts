import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactCard } from '../../../chat/models/contact-card.model';
import { MessageType } from '../../../chat/models/enums/message-type';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupComponent {

  message!: ContactCard;
  photoURL!: string;
  showChat: boolean = false;

  constructor() { }

  back() {
    this.showChat = false;
  }

  ShowChat(): void {
    this.photoURL = 'https://source.unsplash.com/7YVZYZeITc8/30x30';
    this.message = {
      messages: [
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          senderName: 'Tamara Jammoul',
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          senderName: 'Tamara Jammoul',
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: true,
          senderName: 'Amin Atwi',
          messageType: MessageType.Text
        }
      ],
      title: 'Sales Department',
      newMessages: 4,
      photoURL: 'https://source.unsplash.com/7YVZYZeITc8/30x30'
    };
    this.showChat = true;
  }
}
