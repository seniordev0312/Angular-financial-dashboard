import { Inject, Injectable } from "@angular/core";
import { KYC_DOCUMENTS_TYPE_STORE, KycDocumentsTypeStore } from "./kyc-documents-type.store";

@Injectable({
    providedIn: 'root'
})
export class KYCDocumentTypeRepository {
    constructor(
        @Inject(KYC_DOCUMENTS_TYPE_STORE) private kycDocumentsTypeStore: KycDocumentsTypeStore
    ) { }
    updateKYCDocumentType(kycDocumentsType: any) {
        this.kycDocumentsTypeStore.update((state) => ({
            ...state,
            kycDocumentsType: kycDocumentsType
        }));
    }
    getKYCDocumentType() {
        return this.kycDocumentsTypeStore.value.kycDocumentsType;
    }
}