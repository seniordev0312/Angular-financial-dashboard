import { Injectable } from '@angular/core';
import { SignalRAbstract } from './signalr-abstract.component';

@Injectable({
  providedIn: 'root',
})
export abstract class ChatAbstract extends SignalRAbstract {
  // class to handle the common chat functionalities (uploading file, uploading image, send voice note, etc.)
  constructor() {
    super();
  }
}
