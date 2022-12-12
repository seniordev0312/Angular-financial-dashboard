import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EntitiesMappingListItem } from '../models/entities-mapping-list-item.model';
import { EntitiesMappingRepository } from '../store/entities-mapping.repository';
import { AddEntityMapping } from '../models/add-entity-mapping.model';

@Injectable({ providedIn: 'root' })
export class EntitiesMappingsListService {
    private baseUrl = `${environment.apiUrl}/v1.0/`;

    constructor(private httpClient: HttpClient,
        private entitiesMappingRepository: EntitiesMappingRepository) { }

    getEntitiesMappingsList(pageIndex: number, pageSize: number, backendUrl?: string): void {
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
        this.httpClient.get<EntitiesMappingListItem[]>(endPointUrl, httpOptions).subscribe(data => {
            if (!data) {
                this.entitiesMappingRepository.updateEntitiesMappingList(data);
            }
        });
    }

    getMappingDetails(mappingId: string): void {
        const endPointUrl = `${this.baseUrl}/${mappingId}`
        this.httpClient.get<AddEntityMapping>(endPointUrl).subscribe(data => {
            if (!data) {
                this.entitiesMappingRepository.updateSelectedMapping(data);
            }
        });
    }

    addMapping(mapping: AddEntityMapping): void {
        this.httpClient.post<EntitiesMappingListItem>(this.baseUrl, mapping).subscribe(data => {
            if (!data) {
                this.entitiesMappingRepository.addMapping(data);
            }
        });
    }

    editMapping(mapping: AddEntityMapping): void {
        this.httpClient.put<EntitiesMappingListItem>(this.baseUrl, mapping).subscribe(data => {
            if (!data) {
                this.entitiesMappingRepository.updateMapping(data);
            }
        });
    }

    deleteMapping(mappingId: string): void {
        const endPointUrl = `${this.baseUrl}/${mappingId}`
        this.httpClient.delete<void>(endPointUrl).subscribe(() => {
            this.entitiesMappingRepository.deleteMapping(mappingId);
        });
    }
}
