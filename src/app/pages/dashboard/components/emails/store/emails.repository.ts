import { Inject, Injectable } from "@angular/core";
import { EmailItem } from "../models/email-item.model";
import { EMAILS_STORE, EmailsStore } from "./emails.store";

@Injectable({ providedIn: 'root' })
export class EmailsRepository {
    constructor(
        @Inject(EMAILS_STORE) private systemClaimsStore: EmailsStore) {
    }

    updateEmails(emails: EmailItem[]) {
        this.systemClaimsStore.update((state) => ({
            ...state,
            emails: emails
        }));
    }
}