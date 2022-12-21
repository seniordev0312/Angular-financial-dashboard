import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GeneralSystemSettingsRepository } from '../../general-system-settings/store/general-system-settings.repository';

@Injectable({
    providedIn: 'root',
})
export class SystemSetupService {
    private baseUrl = `${environment.entityApiUrl}`;

    constructor(
        private httpClient: HttpClient,
        private generalSystemSettingsRepository: GeneralSystemSettingsRepository
    ) { }

    getDefaultLanguages() {
        let endPointUrl = `${this.baseUrl}/Reference/GetReferencesByKey/Language`;
        let httpOptions = {
            headers: new HttpHeaders(),
            params: new HttpParams(),
        };

        this.httpClient.get<any>(endPointUrl, httpOptions).subscribe(data => {
            if (data) {
                this.generalSystemSettingsRepository.updateDefaultLanguages(data);
            }
        });
    }

    getDefaultCurrency() {
        let endPointUrl = `${this.baseUrl}/Reference/GetReferencesByKey/Currency`;
        let httpOptions = {
            headers: new HttpHeaders(),
            params: new HttpParams(),
        };

        this.httpClient.get<any>(endPointUrl, httpOptions).subscribe(data => {
            if (data) {
                this.generalSystemSettingsRepository.updateDefaultCurrency(data);
            }
        });
    }

    getAccountingStyle() {
        let endPointUrl = `${this.baseUrl}/Reference/GetReferencesByKey/AccountingStyle`;
        let httpOptions = {
            headers: new HttpHeaders(),
            params: new HttpParams(),
        };

        this.httpClient.get<any>(endPointUrl, httpOptions).subscribe(data => {
            if (data) {
                this.generalSystemSettingsRepository.updateAccountingStyle(data);
            }
        });
    }

    getCountries() {
        let endPointUrl = `${this.baseUrl}/Reference/GetReferencesByKey/Country`;
        let httpOptions = {
            headers: new HttpHeaders(),
            params: new HttpParams(),
        };

        this.httpClient.get<any>(endPointUrl, httpOptions).subscribe(data => {
            if (data) {
                this.generalSystemSettingsRepository.updateCountry(data);
            }
        });
    }
}