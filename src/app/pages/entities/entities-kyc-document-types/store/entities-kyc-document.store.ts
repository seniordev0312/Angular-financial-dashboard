import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { AddDocumentType } from '../models/add-document-type.model';
import { KYCDocumentListItem } from '../models/kyc-document-types-list-item.model';

export interface EntitiesKYCDocumentModel {
    documentsList: KYCDocumentListItem[];
    documentDetails: AddDocumentType;
}

const store = createStore(
    {
        name: 'Entities KYC Documents List',
    },
    withProps<EntitiesKYCDocumentModel>({
        documentsList: [],
        documentDetails: {} as AddDocumentType,
    })
);

export const documentsList$ = store.pipe(select(({ documentsList }) => documentsList));
export const documentDetails$ = store.pipe(select(({ documentDetails }) => documentDetails));


export type EntitiesKYCDocumentsStore = typeof store;
export const ENTITIES_KYC_DOCUMENTS_LIST_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For Entities KYC Documents List Store', {
    providedIn: 'root',
    factory: (): EntitiesKYCDocumentsStore => store,
});
