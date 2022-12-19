import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MessageType } from '../../models/enums/message-type';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageCardComponent implements OnInit {

  @Input() message!: Message;


  constructor() { }

  ngOnInit(): void {
  }

  isPhoto(message: Message) {
    return message?.messageType === MessageType.Photo
  };

  isTextMessage(message: Message) {
    return message.messageType === MessageType.Text
  };

  isFile(message: Message) {
    return message?.messageType === MessageType.File
  };

  isAudio(message: Message) {
    return message?.messageType === MessageType.Audio
  };

}
