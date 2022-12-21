import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import {
    persistState,
    sessionStorageStrategy,
} from '@ngneat/elf-persist-state';

export interface SystemClaimsModel {
    chats: any;
}

const store = createStore(
    {
        name: 'system-claims-store',
    },
    withProps<SystemClaimsModel>({
        chats: null,
    })
);

persistState(store, {
    storage: sessionStorageStrategy,
});

export const systemClaimsList$ = store.pipe(select(({ chats }) => chats));

export type SystemClaimsStore = typeof store;
export const SYSTEM_CLAIMS_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For System Claims Store', {
    providedIn: 'root',
    factory: (): SystemClaimsStore => store,
});
