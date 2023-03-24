import { Injectable } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { SignalRAbstract } from '@root/shared/abstract/signalr-abstract.component';
import { SignalRFactory } from '@root/shared/factories/signalr.factory';
import { AuthenticationService } from '@root/shared/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerServiceSignalRService extends SignalRAbstract {
  private connection: HubConnection;
  private readonly baseUrl = `${environment.customerServiceSignalRHub}`;
  token: any;

  constructor(
    private signalRFactory: SignalRFactory,
    private authenticationService: AuthenticationService
  ) {
    super();
    this.authenticationService.token.subscribe((token: any) => {
      this.token = token;
    });
  }

  initConnection() {
    const url = `${this.baseUrl}/Hub/CustomerService`;
    this.connection = this.signalRFactory.createConnection(url, this.token);
    this.addOnReceiveMessageListener(this.connection);
    this.onReconnected(this.connection);
    this.startConnection(this.connection);
  }

  stopSignalRConnection() {
    this.stopConnection(this.connection);
  }
}
