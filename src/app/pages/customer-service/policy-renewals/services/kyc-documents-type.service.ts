import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { KYCDocumentTypeRepository } from "../store/kyc-documents-type-service.repository";

@Injectable({
    providedIn: 'root'
})
export class KYCDocumentTypeService {

    private baseUrl = `${environment.entityApiUrl}`;
    private customerServer = `${environment.customerServer}`;

    extractDocumentSubject = new BehaviorSubject<any>(null);
    extractDocumentSubject$ = this.extractDocumentSubject.asObservable();

    constructor(
        private kYCDocumentTypeRepository: KYCDocumentTypeRepository,
        private httpClient: HttpClient,
    ) { }

    getKYCDocumentType(pageIndex: number, pageSize: number, backendUrl?: string): void {
        let endPointUrl = `${this.baseUrl}/KycDocuments/GetDocumentTypes`;
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
        this.httpClient.get<any>(endPointUrl, httpOptions).subscribe(data => {
            if (data) {
                this.kYCDocumentTypeRepository.updateKYCDocumentType(data);
            }
        });
    }

    extractDocument(extractDocument: any) {
        let endPointUrl = `${this.customerServer}/api/Document/Extract/${extractDocument.chatId}`;
        let httpOptions = {
            headers: new HttpHeaders(),
            params: new HttpParams(),
        };

        this.httpClient.post<any>(endPointUrl, {
            templateReferenceId: extractDocument.templateReferenceId,
            messageId: extractDocument.messageId
        }, httpOptions).subscribe(data => {
            if (data) {
                this.extractDocumentSubject.next(data);
            }
        });
    }
}