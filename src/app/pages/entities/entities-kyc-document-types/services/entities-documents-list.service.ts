import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { KYCDocumentListItem } from '../models/kyc-document-types-list-item.model';
import { EntitiesDocumentsRepository } from '../store/entities-kyc-document.repository';
import { AddDocumentType } from '../models/add-document-type.model';

@Injectable({ providedIn: 'root' })
export class EntitiesDocumentsListService {

    constructor(private httpClient: HttpClient,
        private entitiesDocumentsRepository: EntitiesDocumentsRepository) { }

    getDocumentsList(): void {
        let endPointUrl = `${environment.entityApiUrl}/KycDocuments/GetDocumentTypes`;

        this.httpClient.get<KYCDocumentListItem[]>(endPointUrl).subscribe(data => {
            if (data) {
                this.entitiesDocumentsRepository.updateEntitiesDocumentsList(data);
            }
        });
    }

    getDocumentDetails(templateProcessingKeyInformation: string): void {
        const httpOptions = {
            headers: new HttpHeaders({
                'InterceptorShowSidenavSpinner': '',
            }),
        };

        let endPointUrl = `${environment.entityApiUrl}/KycDocuments/GetDocumentType/${templateProcessingKeyInformation}`;
        this.httpClient.get<KYCDocumentListItem>(endPointUrl, httpOptions).subscribe(data => {
            if (data) {
                this.entitiesDocumentsRepository.updateSelectedDocument(data);
            }
        });
    }

    addDocument(document: AddDocumentType): void {
        let endPointUrl = `${environment.entityApiUrl}/KycDocuments/AddDocumentType`;
        this.httpClient.post<KYCDocumentListItem>(endPointUrl, document).subscribe(data => {
            if (data) {
                this.entitiesDocumentsRepository.addDocument(data);
            }
        });
    }

    editDocument(document: AddDocumentType): void {
        let endPointUrl = `${environment.entityApiUrl}/KycDocuments/UpdateDocumentType/${document.templateProcessingKeyInformation}`;
        this.httpClient.put<KYCDocumentListItem>(endPointUrl, document).subscribe(data => {
            if (data) {
                this.entitiesDocumentsRepository.updateDocument(data);
            }
        });
    }

    activateDocument(templateProcessingKeyInformation: string, value: boolean): void {
        let endPointUrl = `${environment.entityApiUrl}/KycDocuments/ActivateDocumentType/${templateProcessingKeyInformation}/${value}`;
        this.httpClient.put<KYCDocumentListItem>(endPointUrl, null).subscribe((data) => {
            this.entitiesDocumentsRepository.updateDocument(data);
        });
    }
}
