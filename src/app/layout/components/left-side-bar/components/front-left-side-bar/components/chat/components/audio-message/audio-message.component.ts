import { Component, Input } from '@angular/core';
import { DEFAULT_AUDIO_FORMAT } from '@root/shared/settings/common.settings';
import Plyr from 'plyr';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-audio-message',
  templateUrl: './audio-message.component.html',
})
export class AudioMessageComponent {
  @Input() message: Message;
  player: Plyr;

  constructor() { }


  play(): void {
    this.player.play();
  }

  stop(): void {
    this.player.stop();
  }

  getAudio(_message: Message): Plyr.Source[] {
    return [
      {
        // src: message.message,
        src: '',
        type: DEFAULT_AUDIO_FORMAT,
      },
    ];
  }
}
