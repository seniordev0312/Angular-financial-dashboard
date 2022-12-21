import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Holiday } from '../models/holiday.model';

import { GeneralSystemSettingsRepository } from '../store/general-system-settings.repository';

@Injectable({
    providedIn: 'root',
})
export class GeneralSystemSettingsService {

    private baseUrl = `${environment.entityApiUrl}`;
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
        this.httpClient.post<any>(endPointUrl, generalSystemSettings, httpOptions).subscribe(data => {
            if (data) {
                this.generalSystemSettingsRepository.updateGeneralSystemSettings(data);
            }
        });
    }

    getHolidays(pageIndex: number, pageSize: number, backendUrl?: string): void {
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
        this.httpClient.get<any>(endPointUrl, httpOptions).subscribe(data => {
            if (data) {
                if (data.length === 0) {
                    data = [
                        {
                            endDate: '10/11/2023',
                            name: 'Eid El Adha',
                            offDay: true,
                            startDate: '10/11/2023'
                        },
                        {
                            endDate: '05/7/2023',
                            name: 'Eid El Saydeh',
                            offDay: true,
                            startDate: '05/7/2023'
                        },
                        {
                            endDate: '11/11/2023',
                            name: 'Independence Day',
                            offDay: true,
                            startDate: '11/11/2023'
                        },
                        {
                            endDate: '05/06/2023',
                            name: 'Eid Marmaroun',
                            offDay: false,
                            startDate: '04/06/2023'
                        },
                        {
                            endDate: '26/12/2023',
                            name: 'Christmas',
                            offDay: true,
                            startDate: '23/12/2023'
                        },
                        {
                            endDate: '31/12/2023',
                            name: 'New Year',
                            offDay: false,
                            startDate: '29/12/2023'
                        },
                        {
                            endDate: '05/7/2023',
                            name: 'Eid El Saydeh',
                            offDay: true,
                            startDate: '05/7/2023'
                        },
                        {
                            endDate: '11/11/2023',
                            name: 'Independence Day',
                            offDay: true,
                            startDate: '11/11/2023'
                        },
                        {
                            endDate: '05/06/2023',
                            name: 'Eid Marmaroun',
                            offDay: false,
                            startDate: '04/06/2023'
                        },
                        {
                            endDate: '26/12/2023',
                            name: 'Christmas',
                            offDay: true,
                            startDate: '23/12/2023'
                        },
                        {
                            endDate: '31/12/2023',
                            name: 'New Year',
                            offDay: false,
                            startDate: '29/12/2023'
                        }
                    ];
                }
                this.generalSystemSettingsRepository.updateHolidays(data);
            }
        });
    }

    deleteHoliday(_holiday: Holiday) {
        // console.log(holiday);
    }
}