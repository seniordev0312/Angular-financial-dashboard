import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SignalEvent } from "./signal-event";
import { SignalEventType } from "./signal-event-type";

@Injectable()
export abstract class AbstractSignalRService {
    abstract getDataStream<TDataShape>(...filterValues: SignalEventType[]): Observable<SignalEvent<TDataShape>>
}