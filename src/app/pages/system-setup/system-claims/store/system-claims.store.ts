import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import {
    persistState,
    sessionStorageStrategy,
} from '@ngneat/elf-persist-state';
import { SystemClaimsList } from '../models/system-claims-list.model';

export interface SystemClaimsModel {
    systemClaims: SystemClaimsList;
}

const store = createStore(
    {
        name: 'system-claims-store',
    },
    withProps<SystemClaimsModel>({
        systemClaims: null,
    })
);

persistState(store, {
    storage: sessionStorageStrategy,
});

export const systemClaimsList$ = store.pipe(select(({ systemClaims }) => systemClaims?.systemClaimsList));

export type SystemClaimsStore = typeof store;
export const SYSTEM_CLAIMS_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For System Claims Store', {
    providedIn: 'root',
    factory: (): SystemClaimsStore => store,
});
