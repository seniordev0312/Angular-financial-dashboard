import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EntitiesControlRepository } from '../store/entities-control.repository';
import { EntitiesControlListItem } from '../models/entities-control-list-item.model';

@Injectable({ providedIn: 'root' })
export class EntitiesControlService {
    private baseUrl = `${environment.apiUrl}/v1.0/`;

    constructor(private httpClient: HttpClient,
        private entitiesControlRepository: EntitiesControlRepository) { }

    getEntitiesList(pageIndex: number, pageSize: number, backendUrl?: string): void {
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
        this.httpClient.get<EntitiesControlListItem[]>(endPointUrl, httpOptions).subscribe(data => {
            if (!data) {
                this.entitiesControlRepository.updateEntitiesList(data);
            }
        });
    }

}
