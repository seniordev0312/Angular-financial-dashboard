import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import {
    persistState,
    sessionStorageStrategy,
} from '@ngneat/elf-persist-state';

export interface GeneralSystemSettingsModel {
    holidays: any;
}

const store = createStore(
    {
        name: 'system-claims-store',
    },
    withProps<GeneralSystemSettingsModel>({
        holidays: null,
    })
);

persistState(store, {
    storage: sessionStorageStrategy,
});

export const holidays$ = store.pipe(select(({ holidays }) => holidays));

export type GeneralSystemSettingsStore = typeof store;
export const GENERAL_SYSTEM_SETTINGS_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For General System Settings Store', {
    providedIn: 'root',
    factory: (): GeneralSystemSettingsStore => store,
});
