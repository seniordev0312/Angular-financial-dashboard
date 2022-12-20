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

    addEmail(emails: any) {
        console.log(emails);
        let newReports: any[] = [];
        if (this.systemClaimsStore.value.emails) {
            newReports = [...this.systemClaimsStore.value.emails];
        }
        let index = newReports.findIndex((e: any) => e.key === emails[0].key);
        console.log(index);

        if (index !== -1) {
            let value = emails[0].value.concat(newReports[index].value);
            newReports[index].value = value
            this.updateEmails(newReports);
        } else {
            // newReports.push(report)
        }
    }

}