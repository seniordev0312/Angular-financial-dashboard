import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Module } from "../../shared/models/module.model";
import { SystemClaimsRepository } from "../store/system-claims.repository";

@Injectable({ providedIn: 'root' })
export class SystemClaimsService {
    private baseUrl = `${environment.identityServerURL}/Clients/3/ClaimGroups`;

    constructor(
        private httpClient: HttpClient,
        private systemClaimsRepository: SystemClaimsRepository
    ) { }

    getSystemClaims(pageIndex: number, pageSize: number, backendUrl?: string): void {
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
        this.httpClient.get<Module[]>(endPointUrl, httpOptions).subscribe(data => {
            if (data) {
                const result = data.map((value: Module) => {
                    return value.clientClaims
                })
                this.systemClaimsRepository.updateSystemClaims({ systemClaimsList: result.flat(1) });
            }
        });
    }
}