import { Injectable, Inject } from '@angular/core';
import { AddDocumentType } from '../models/add-document-type.model';
import { KYCDocumentListItem } from '../models/kyc-document-types-list-item.model';
import { EntitiesKYCDocumentsStore, ENTITIES_KYC_DOCUMENTS_LIST_STORE } from './entities-kyc-document.store';

@Injectable({
    providedIn: 'root',
})
export class EntitiesDocumentsRepository {
    constructor(
        @Inject(ENTITIES_KYC_DOCUMENTS_LIST_STORE) private entitiesKYCDocumentsStore: EntitiesKYCDocumentsStore,
    ) { }

    updateSelectedDocument(document: AddDocumentType): void {
        this.entitiesKYCDocumentsStore.update((state) => ({
            ...state,
            documentDetails: document
        }));
    }

    updateEntitiesDocumentsList(entitiesDocumentsList: KYCDocumentListItem[]): void {
        this.entitiesKYCDocumentsStore.update((state) => ({
            ...state,
            documentsList: entitiesDocumentsList
        }));
    }

    addDocument(addedDocument: KYCDocumentListItem) {
        this.entitiesKYCDocumentsStore.update((state) => ({
            ...state,
            documentsList: { ...addedDocument, ...this.entitiesKYCDocumentsStore.value.documentsList }
        }));
    }

    deleteDocument(documentId: string) {
        const documentsList = this.entitiesKYCDocumentsStore.value.documentsList;
        this.entitiesKYCDocumentsStore.update((state) => ({
            ...state,
            documentsList: [...documentsList.filter(element => element.id === documentId)]
        }));
    }

    updateDocument(document: KYCDocumentListItem) {
        this.entitiesKYCDocumentsStore.update((state) => ({
            ...state,
            documentsList: this.getUpdatedDocumentsList(document)
        }));
    }

    getUpdatedDocumentsList(document: KYCDocumentListItem): KYCDocumentListItem[] {
        const newList = [...this.entitiesKYCDocumentsStore.value.documentsList];
        const index = newList.findIndex((e) => e.id === document.id);
        if (index !== -1) {
            newList[index] = document;
        }

        return newList;
    }
}
