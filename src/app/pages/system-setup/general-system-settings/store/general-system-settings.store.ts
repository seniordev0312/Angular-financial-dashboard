import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import {
    persistState,
    sessionStorageStrategy,
} from '@ngneat/elf-persist-state';

export interface GeneralSystemSettingsModel {
    holidays: any;
    defaultLanguages: any,
    defaultCurrency: any,
    accountingStyle: any,
    country: any,
    generalSystemSettings: any,
}

const store = createStore(
    {
        name: 'system-claims-store',
    },
    withProps<GeneralSystemSettingsModel>({
        holidays: null,
        defaultLanguages: null,
        defaultCurrency: null,
        accountingStyle: null,
        country: null,
        generalSystemSettings: null,
    })
);

persistState(store, {
    storage: sessionStorageStrategy,
});

export const holidays$ = store.pipe(select(({ holidays }) => holidays));
export const defaultLanguages$ = store.pipe(select(({ defaultLanguages }) => defaultLanguages));
export const defaultCurrency$ = store.pipe(select(({ defaultCurrency }) => defaultCurrency));
export const accountingStyle$ = store.pipe(select(({ accountingStyle }) => accountingStyle));
export const country$ = store.pipe(select(({ country }) => country));
export const generalSystemSettings$ = store.pipe(select(({ generalSystemSettings }) => generalSystemSettings));

export type GeneralSystemSettingsStore = typeof store;
export const GENERAL_SYSTEM_SETTINGS_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For General System Settings Store', {
    providedIn: 'root',
    factory: (): GeneralSystemSettingsStore => store,
});
