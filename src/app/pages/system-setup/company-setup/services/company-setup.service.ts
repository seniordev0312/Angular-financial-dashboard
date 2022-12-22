import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompanySetupRepository } from '../store/company-setup.repository';



@Injectable({
    providedIn: 'root',
})
export class CompanySetupService {


    private entityApiUrl = `${environment.entityApiUrl}`;

    companySetupSubject = new BehaviorSubject<void>(null);
    companySetupSubject$ = this.companySetupSubject.asObservable();

    constructor(
        private httpClient: HttpClient,
        private companySetupRepository: CompanySetupRepository
    ) { }


    updateCompanySetup(companySetup: any) {
        let endPointUrl = `${this.entityApiUrl}/GeneralSystemSettings/UpdateCompanySetup`;
        let httpOptions = {
            headers: new HttpHeaders(),
            params: new HttpParams(),
        };

        this.httpClient.put<any>(endPointUrl, companySetup, httpOptions).subscribe(data => {
            if (data) {
                this.companySetupRepository.updateCompanySetup(data)
            }
        });
    }
    getCompanySetup() {
        let endPointUrl = `${this.entityApiUrl}/GeneralSystemSettings/GetCompanySetup`;
        let httpOptions = {
            headers: new HttpHeaders(),
            params: new HttpParams(),
        };

        this.httpClient.put<any>(endPointUrl, {}, httpOptions).subscribe(data => {
            if (data) {
                this.companySetupRepository.updateCompanySetup(data)
            }
        });
    }

}