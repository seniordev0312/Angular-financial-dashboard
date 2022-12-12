import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { KYCDocumentListItem } from '../models/kyc-document-types-list-item.model';
import { EntitiesDocumentsRepository } from '../store/entities-kyc-document.repository';
import { AddDocumentType } from '../models/add-document-type.model';

@Injectable({ providedIn: 'root' })
export class EntitiesDocumentsListService {
    private baseUrl = `${environment.apiUrl}/v1.0/`;

    constructor(private httpClient: HttpClient,
        private entitiesDocumentsRepository: EntitiesDocumentsRepository) { }

    getDocumentsList(pageIndex: number, pageSize: number, backendUrl?: string): void {
        let endPointUrl = this.baseUrl;
        let httpOptions = {
            headers: new HttpHeaders(),
            params: new HttpParams(),
        };
        if (backendUrl) {
            endPointUrl = backendUrl;
        }
        else {
            httpOptions = {
                ...httpOptions,
                params: httpOptions.params.set('PageIndex', pageIndex.toString()).set('PageSize', pageSize.toString()),
            }
        }
        this.httpClient.get<KYCDocumentListItem[]>(endPointUrl, httpOptions).subscribe(data => {
            if (!data) {
                this.entitiesDocumentsRepository.updateEntitiesDocumentsList(data);
            }
        });
    }

    getDocumentDetails(documentId: string): void {
        const endPointUrl = `${this.baseUrl}/${documentId}`
        this.httpClient.get<KYCDocumentListItem>(endPointUrl).subscribe(data => {
            if (!data) {
                this.entitiesDocumentsRepository.updateDocument(data);
            }
        });
    }

    addDocument(document: AddDocumentType): void {
        this.httpClient.post<KYCDocumentListItem>(this.baseUrl, document).subscribe(data => {
            if (!data) {
                this.entitiesDocumentsRepository.addDocument(data);
            }
        });
    }

    editDocument(document: AddDocumentType): void {
        this.httpClient.put<KYCDocumentListItem>(this.baseUrl, document).subscribe(data => {
            if (!data) {
                this.entitiesDocumentsRepository.updateDocument(data);
            }
        });
    }

    deleteDocument(documentId: string): void {
        const endPointUrl = `${this.baseUrl}/${documentId}`
        this.httpClient.delete<void>(endPointUrl).subscribe(() => {
            this.entitiesDocumentsRepository.deleteDocument(documentId);
        });
    }
}
