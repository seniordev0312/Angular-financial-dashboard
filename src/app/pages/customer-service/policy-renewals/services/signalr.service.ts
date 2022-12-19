import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private readonly baseUrl = `${environment.signalRHub}`;
  private options: signalR.IHttpConnectionOptions;
  private hubConnection: signalR.HubConnection;

  constructor(private oidcSecurityService: OidcSecurityService,
    private route: ActivatedRoute) {
    this.options = {
      transport: signalR.HttpTransportType.LongPolling,
      accessTokenFactory: () => lastValueFrom(this.oidcSecurityService.getAccessToken()),
      withCredentials: false
    };


    this.createConnection();

    this.addOnReceiveMessageListener();

    this.onReconnected();

  }

  public createConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.baseUrl}/Hub/CustomerService`, this.options)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
  };

  public startConnection = () => {
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(error => {
        console.log('Error while establishing connection', error);
      });

  };

  public onReconnected = () => {
    this.hubConnection.onreconnected(() => {

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

  public addOnReceiveMessageListener = () => {
    this.hubConnection.on('OnTicketCreated', (message: any) => {
      console.log(message);
    });
  };

  public stopConnection = () => {
    this.hubConnection
      .stop()
      .then(() => console.log('Connection stopped'))
      .catch(err => console.log('Error while stopping connection: ' + err));
  };

}
