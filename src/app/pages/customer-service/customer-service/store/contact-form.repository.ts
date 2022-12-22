import { Inject, Injectable } from '@angular/core';
import { ChatStore, CHAT_STORE } from './contact-form.store';

@Injectable({
    providedIn: 'root'
})
export class ChatRepository {

    constructor(
        @Inject(CHAT_STORE) private chatStore: ChatStore
    ) { }

    updateData(data: any) {
        this.chatStore.update((state) => ({
            ...state,
            data: data
        }));
    }

    getData() {
        return this.chatStore.value.data;
    }
}