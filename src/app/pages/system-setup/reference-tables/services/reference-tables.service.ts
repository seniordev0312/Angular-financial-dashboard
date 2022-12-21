import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { ReferenceTables } from "../model/reference-tables.model";
import { ReferenceTablesRepository } from "../store/reference-tables.repository";

@Injectable({ providedIn: 'root' })
export class ReferenceTablesService {
    private baseUrl = `${environment.entityApiUrl}`;

    addReferenceTablesSubject = new BehaviorSubject<void>(null);
    addReferenceTables$ = this.addReferenceTablesSubject.asObservable();

    constructor(
        private referenceTablesRepository: ReferenceTablesRepository,
        private httpClient: HttpClient,
    ) { }

    getReferenceTables(pageIndex: number, pageSize: number, backendUrl?: string): void {
        let endPointUrl = `${this.baseUrl}/Reference/GetReferences`;
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
                this.referenceTablesRepository.updateReferenceTables(data);
            }
        });
    }

    addReferenceTables(referenceTables: ReferenceTables) {
        let endPointUrl = `${this.baseUrl}/Reference/AddReference`;
        let httpOptions = {
            headers: new HttpHeaders(),
            params: new HttpParams(),
        };

        this.httpClient.post<any>(endPointUrl, referenceTables, httpOptions).subscribe(data => {
            console.log(data);
            this.addReferenceTablesSubject.next();
        });
    }
}