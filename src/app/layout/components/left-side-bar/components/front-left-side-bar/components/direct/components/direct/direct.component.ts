import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ContactCard } from '../../../chat/models/contact-card.model';
import { MessageType } from '../../../chat/models/enums/message-type';

@Component({
  selector: 'app-direct',
  templateUrl: './direct.component.html',
  styleUrls: ['./direct.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirectComponent implements OnInit {

  contacts: ContactCard[] = [
    {
      messages: [
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: true,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: true,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:31',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: true,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: true,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:31',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: true,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: true,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:31',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: true,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: true,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:31',
          received: false,
          messageType: MessageType.Text
        }
      ],
      title: 'Andrea Ismail',
      newMessages: 2,
      photoURL: 'https://source.unsplash.com/7YVZYZeITc8/30x30'
    },
    {
      messages: [
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        }
      ],
      title: 'Andrea Ismail',
      newMessages: 1,
      photoURL: 'https://source.unsplash.com/7YVZYZeITc8/30x30'
    },
    {
      messages: [
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        }
      ],
      title: 'Andrea Ismail',
      newMessages: 5,
      photoURL: 'https://source.unsplash.com/7YVZYZeITc8/30x30'
    },
    {
      messages: [
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        }
      ],
      title: 'Andrea Ismail',
      newMessages: 4,
      photoURL: 'https://source.unsplash.com/7YVZYZeITc8/30x30'
    },
    {
      messages: [
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        }
      ],
      title: 'Andrea Ismail',
      newMessages: 3,
      photoURL: 'https://source.unsplash.com/7YVZYZeITc8/30x30'
    },
    {
      messages: [
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        }
      ],
      title: 'Andrea Ismail',
      newMessages: 1,
      photoURL: 'https://source.unsplash.com/7YVZYZeITc8/30x30'
    },
    {
      messages: [
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        }
      ],
      title: 'Andrea Ismail',
      newMessages: 5,
      photoURL: 'https://source.unsplash.com/7YVZYZeITc8/30x30'
    },
    {
      messages: [
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        }
      ],
      title: 'Andrea Ismail',
      newMessages: 4,
      photoURL: 'https://source.unsplash.com/7YVZYZeITc8/30x30'
    },
    {
      messages: [
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        }
      ],
      title: 'Andrea Ismail',
      newMessages: 3,
      photoURL: 'https://source.unsplash.com/7YVZYZeITc8/30x30'
    },
    {
      messages: [
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        }
      ],
      title: 'Andrea Ismail',
      newMessages: 1,
      photoURL: 'https://source.unsplash.com/7YVZYZeITc8/30x30'
    },
    {
      messages: [
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        }
      ],
      title: 'Andrea Ismail',
      newMessages: 5,
      photoURL: 'https://source.unsplash.com/7YVZYZeITc8/30x30'
    },
    {
      messages: [
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        }
      ],
      title: 'Andrea Ismail',
      newMessages: 4,
      photoURL: 'https://source.unsplash.com/7YVZYZeITc8/30x30'
    },
    {
      messages: [
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        }
      ],
      title: 'Andrea Ismail',
      newMessages: 3,
      photoURL: 'https://source.unsplash.com/7YVZYZeITc8/30x30'
    },
    {
      messages: [
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        }
      ],
      title: 'Andrea Ismail',
      newMessages: 1,
      photoURL: 'https://source.unsplash.com/7YVZYZeITc8/30x30'
    },
    {
      messages: [
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        }
      ],
      title: 'Andrea Ismail',
      newMessages: 5,
      photoURL: 'https://source.unsplash.com/7YVZYZeITc8/30x30'
    },
    {
      messages: [
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        }
      ],
      title: 'Andrea Ismail',
      newMessages: 4,
      photoURL: 'https://source.unsplash.com/7YVZYZeITc8/30x30'
    },
    {
      messages: [
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        },
        {
          message: 'Are we Meeting Today? Waiting for your response',
          time: '2:30',
          received: false,
          messageType: MessageType.Text
        }
      ],
      title: 'Andrea Ismail',
      newMessages: 3,
      photoURL: 'https://source.unsplash.com/7YVZYZeITc8/30x30'
    },
  ];

  message!: ContactCard;
  photoURL!: string;
  showChat: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  back() {
    this.showChat = false;
  }

  ShowChat(message: ContactCard): void {
    this.photoURL = message.photoURL;
    this.message = message;
    this.showChat = true;
  }
}
