import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import {
    persistState,
    sessionStorageStrategy,
} from '@ngneat/elf-persist-state';

export interface ReportsModel {
    reports: any;
}

const store = createStore(
    {
        name: 'reports-store',
    },
    withProps<ReportsModel>({
        reports: null,
    })
);

persistState(store, {
    storage: sessionStorageStrategy,
});

export const reports$ = store.pipe(select(({ reports }) => reports));

export type ReportsStore = typeof store;
export const REPORTS_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For Reports Store', {
    providedIn: 'root',
    factory: (): ReportsStore => store,
});
