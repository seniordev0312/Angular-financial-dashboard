import { SignalEventType } from './signal-event-type';

export interface SignalEvent<TDataShape> {
    type: SignalEventType,
    data: TDataShape
}