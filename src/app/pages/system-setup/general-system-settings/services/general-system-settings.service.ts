import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Holiday } from '../models/holiday.model';

import { GeneralSystemSettingsRepository } from '../store/general-system-settings.repository';

@Injectable({
    providedIn: 'root',
})
export class GeneralSystemSettingsService {

    private baseUrl = `${environment.entityApiUrl}`;

    addHolidaySubject = new BehaviorSubject<void>(null);
    addHoliday$ = this.addHolidaySubject.asObservable();

    constructor(
        private httpClient: HttpClient,
        private generalSystemSettingsRepository: GeneralSystemSettingsRepository
    ) { }

    getGeneralSystemSettings() {
        let endPointUrl = `${this.baseUrl}/GeneralSystemSettings/GetGeneralSystemSettings`;
        let httpOptions = {
            headers: new HttpHeaders(),
            params: new HttpParams(),
        };
        this.httpClient.get<any>(endPointUrl, httpOptions).subscribe(data => {
            if (data) {
                this.generalSystemSettingsRepository.updateGeneralSystemSettings(data);
            }
        });
    }

    updateGeneralSystemSettings(generalSystemSettings: any) {
        let endPointUrl = `${this.baseUrl}/GeneralSystemSettings/UpdateGeneralSystemSettings`;
        let httpOptions = {
            headers: new HttpHeaders(),
            params: new HttpParams(),
        };
        this.httpClient.put<any>(endPointUrl, generalSystemSettings, httpOptions).subscribe(data => {
            if (data) {
                this.generalSystemSettingsRepository.updateGeneralSystemSettings(data);
            }
        });
    }

    getHolidays(pageIndex: number, pageSize: number, backendUrl?: string): void {
        let endPointUrl = `${this.baseUrl}/GeneralSystemSettings/GetHolidays`;
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
                this.generalSystemSettingsRepository.updateHolidays(data);
            }
        });
    }

    addHoliday(holiday: Holiday) {
        let endPointUrl = `${this.baseUrl}/GeneralSystemSettings/AddHoliday`;
        let httpOptions = {
            headers: new HttpHeaders(),
            params: new HttpParams(),
        };
        this.httpClient.post<any>(endPointUrl, holiday, httpOptions).subscribe(_data => {
            this.addHolidaySubject.next();
        });
    }

    deleteHoliday(holiday: Holiday) {
        // console.log(holiday);
        let endPointUrl = `${this.baseUrl}/GeneralSystemSettings/DeleteHoliday/${holiday.holidayId}`;
        this.httpClient.delete<any>(endPointUrl).subscribe(_data => {
            this.addHolidaySubject.next();
        });
    }
}