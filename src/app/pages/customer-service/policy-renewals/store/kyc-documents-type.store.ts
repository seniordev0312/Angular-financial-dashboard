import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import {
    persistState,
    sessionStorageStrategy,
} from '@ngneat/elf-persist-state';
import { KycDocumentsType } from '../models/kyc-documents-type.model';

export interface KycDocumentsTypeModel {
    kycDocumentsType: KycDocumentsType[];
}

const store = createStore(
    {
        name: 'kyc-documents-type-store',
    },
    withProps<KycDocumentsTypeModel>({
        kycDocumentsType: null,
    })
);

persistState(store, {
    storage: sessionStorageStrategy,
});

export const kycDocumentsType$ = store.pipe(select(({ kycDocumentsType }) => kycDocumentsType));

export type KycDocumentsTypeStore = typeof store;
export const KYC_DOCUMENTS_TYPE_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For KYC Document Type Store', {
    providedIn: 'root',
    factory: (): KycDocumentsTypeStore => store,
});
