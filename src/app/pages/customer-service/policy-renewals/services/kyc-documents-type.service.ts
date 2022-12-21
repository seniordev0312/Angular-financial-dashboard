import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { KYCDocumentTypeRepository } from "../store/kyc-documents-type-service.repository";

@Injectable({
    providedIn: 'root'
})
export class KYCDocumentTypeService {

    private baseUrl = `${environment.entityApiUrl}`;

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
}