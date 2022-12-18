import { Message } from "./message.model";

export class ContactCard {
    photoURL!: string;
    title!: string;
    messages!: Message[];
    newMessages!: number;
}   