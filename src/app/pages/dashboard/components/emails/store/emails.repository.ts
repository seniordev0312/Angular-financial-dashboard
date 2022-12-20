import { Inject, Injectable } from "@angular/core";
import { EmailItem } from "../models/email-item.model";
import { EMAILS_STORE, EmailsStore } from "./emails.store";

@Injectable({ providedIn: 'root' })
export class EmailsRepository {
    constructor(
        @Inject(EMAILS_STORE) private systemClaimsStore: EmailsStore) {
    }

    updateEmailMessages(messageId: string, message: any) {
        this.systemClaimsStore.update((state) => ({
            ...state,
            emailsMessages: { messageId, message }
        }));

    }
    updateEmails(emails: EmailItem[]) {
        this.systemClaimsStore.update((state) => ({
            ...state,
            emails: emails
        }));
    }
}