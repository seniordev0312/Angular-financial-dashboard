import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/auth.service';

import { AbstractSignalRService } from './abstract-signalR.service';
import { SignalEvent } from './signal-event';
import { SignalEventType } from './signal-event-type';


@Injectable()
export class SignalRService extends AbstractSignalRService {

    hubUrl: string;
    private _signalEvent: BehaviorSubject<SignalEvent<any>>;
    private _openConnection: boolean = false;
    private _isInitializing: boolean = false;
    private _hubConnection!: HubConnection;

    constructor(private authenticationService: AuthenticationService) {
        super();
        this.hubUrl = environment.signalRHub;
        this._signalEvent = new BehaviorSubject<any>(null)
    }


    ensureConnection() {
        if (this._openConnection || this._isInitializing) return;
        this._initializeSignalR();
    }

    private _initializeSignalR() {
        console.log('_initializeSignalR');

        this.authenticationService.token.subscribe(async (token: any) => {
            console.log('authenticationService');

            this._hubConnection = new signalR.HubConnectionBuilder()
                .withUrl(`${this.hubUrl}/Hub/Email`, { headers: { Authorization: `Bearer ${token}` } })
                .withAutomaticReconnect()
                .build();

            await this._hubConnection.start().then(_ => {
                this._openConnection = true;
                this._isInitializing = false;
                this._setupSignalREvents()
            });
        })
    }

    private _setupSignalREvents() {
        this._hubConnection.on('email', (data) => {
            this._onMessage({ type: SignalEventType.email, data })
        })

        this._hubConnection.on('chats', (data) => {
            this._onMessage({ type: SignalEventType.chats, data })
        })

        this._hubConnection.onclose((_e) => this._openConnection = false);
    }

    private _onMessage<TDataShape>(payload: SignalEvent<TDataShape>) {
        this._signalEvent.next(payload);
    }

    getDataStream<TDataShape>(...filterValues: SignalEventType[]): Observable<SignalEvent<TDataShape>> {

        return this._signalEvent.asObservable().pipe(filter(event => filterValues.some(f => f === event?.type)));
    }
}