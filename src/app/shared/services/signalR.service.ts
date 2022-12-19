import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class SignalRService {
    hubUrl: string;
    connection!: signalR.HubConnection;

    connected(): boolean {
        return this.connection.state === signalR.HubConnectionState.Connected
    }
    private SignalRStatus = new Subject<any>();

    toggleSignalRStatus(data: any): void {
        this.SignalRStatus.next(data);
    }

    onSignalRStatusToggle(): Observable<any> {
        return this.SignalRStatus.asObservable();
    }

    constructor(private authenticationService: AuthenticationService) {
        this.hubUrl = environment.signalRHub;
    }

    public async initiateEmailSignalRConnection(): Promise<void> {
        try {
            this.authenticationService.token.subscribe(async (token: any) => {
                this.connection = new signalR.HubConnectionBuilder()
                    .withUrl(`${this.hubUrl}/Hub/Email`, { headers: { Authorization: `Bearer ${token}` } })
                    .withAutomaticReconnect()
                    .build();

                this.connection.on("onError", (data: any) => {
                    this.toggleSignalRStatus({ event: 'onError', data });
                });

                this.connection.on("onStatusUpdated", (data: any) => {
                    this.toggleSignalRStatus({ event: 'onStatusUpdated', data });
                });

                this.connection.on("onComplete", (data: any) => {
                    this.toggleSignalRStatus({ event: 'onComplete', data });
                });

                await this.connection.start();
            })
        }
        catch (error) {
            console.log(`SignalR connection error: ${error}`);
        }
    }

    send(data: any, action: string): void {
        try {
            if (this.connection.state === signalR.HubConnectionState.Connected) {
                this.connection.invoke(action, data);
            }
        } catch (error: any) {
            console.error(error);
        }
    }
}