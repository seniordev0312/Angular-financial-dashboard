import { MessageType } from "./enums/message-type";

export class Message {
    message: string | File;
    time: string;
    received: boolean;
    senderName?: string;
    messageType: MessageType;
}