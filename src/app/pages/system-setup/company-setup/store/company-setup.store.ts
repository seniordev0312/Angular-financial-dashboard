import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import {
    persistState,
    sessionStorageStrategy,
} from '@ngneat/elf-persist-state';

export interface CompanySetupModel {
    companySetup: any;
}

const store = createStore(
    {
        name: 'company-setup-store',
    },
    withProps<CompanySetupModel>({
        companySetup: null,
    })
);

persistState(store, {
    storage: sessionStorageStrategy,
});

export const companySetup$ = store.pipe(select(({ companySetup }) => companySetup));

export type CompanySetupStore = typeof store;
export const COMPANY_SETUP_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For General Company Setup Store', {
    providedIn: 'root',
    factory: (): CompanySetupStore => store,
});
