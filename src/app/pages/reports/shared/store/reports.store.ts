import { InjectionToken } from '@angular/core';
import { createStore, withProps } from '@ngneat/elf';
import {
    persistState,
    sessionStorageStrategy,
} from '@ngneat/elf-persist-state';

export interface ReportsModel {
    reportA: any;
    reportB: any;
    reportC: any;
}

const store = createStore(
    {
        name: 'reports-store',
    },
    withProps<ReportsModel>({
        reportA: null,
        reportB: null,
        reportC: null,
    })
);

persistState(store, {
    storage: sessionStorageStrategy,
});


export type ReportsStore = typeof store;
export const REPORTS_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For Reports Store', {
    providedIn: 'root',
    factory: (): ReportsStore => store,
});
