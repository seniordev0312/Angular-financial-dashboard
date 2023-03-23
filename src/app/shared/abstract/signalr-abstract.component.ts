import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HubConnection } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class SignalRAbstract {
  SignalRSubject = new BehaviorSubject<any>(null);
  signalRSubject$ = this.SignalRSubject.asObservable();
  private route: ActivatedRoute;

  constructor() {}

  startConnection = (hubConnection: HubConnection) => {
    hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((error) => {
        console.log('Error while establishing connection', error);
      });
  };

  onReconnected = (hubConnection: HubConnection) => {
    hubConnection.onreconnected(() => {
      while (this.route.firstChild) {
        this.route = this.route.firstChild;
      }

      this.route.paramMap.subscribe((params: ParamMap) => {
        const organizationId = params.get('organizationId');
        if (organizationId) {
          // this.store.dispatch(ChatsActions.fetchChatConversation(params.get('organizationId')));
        }
      });
    });
  };

  addOnReceiveMessageListener = (hubConnection: HubConnection) => {
    hubConnection.on('OnMessageReceived', (message: any) => {
      console.log('OnMessageReceived', message);
      this.SignalRSubject.next(message);
    });
    hubConnection.on('Connected', (message: any) => {
      console.log(message);
    });
    hubConnection.on('OnConnected', (message: any) => {
      console.log(message);
    });
  };

  stopConnection = (hubConnection: HubConnection) => {
    hubConnection
      .stop()
      .then(() => console.log('Connection stopped'))
      .catch((err) => console.log('Error while stopping connection: ' + err));
  };
}
