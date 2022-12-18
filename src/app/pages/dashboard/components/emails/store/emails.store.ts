import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import {
    persistState,
    sessionStorageStrategy,
} from '@ngneat/elf-persist-state';
import { EmailItem } from '../models/email-item.model';

export interface EmailsModel {
    emails: EmailItem[];
    emailsMessages: any
}

const store = createStore(
    {
        name: 'emails-store',
    },
    withProps<EmailsModel>({
        emails: null,
        emailsMessages: null
    })
);

persistState(store, {
    storage: sessionStorageStrategy,
});

export const emails$ = store.pipe(select(({ emails }) => emails));
export const emailsMessages$ = store.pipe(select(({ emailsMessages }) => emailsMessages));

export type EmailsStore = typeof store;
export const EMAILS_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For Emails Store', {
    providedIn: 'root',
    factory: (): EmailsStore => store,
});
