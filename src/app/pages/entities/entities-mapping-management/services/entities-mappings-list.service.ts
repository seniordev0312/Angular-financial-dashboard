import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EntitiesMappingListItem } from '../models/entities-mapping-list-item.model';
import { EntitiesMappingRepository } from '../store/entities-mapping.repository';
import { AddEntityMapping } from '../models/add-entity-mapping.model';

@Injectable({ providedIn: 'root' })
export class EntitiesMappingsListService {

    constructor(private httpClient: HttpClient,
        private entitiesMappingRepository: EntitiesMappingRepository) { }

    getEntitiesMappingsList(entitySourceMappingId: string): void {
        let endPointUrl = `${environment.entityApiUrl}/MappingSource/GetEntitySourceMappingFields/${entitySourceMappingId}`;
        this.httpClient.get<EntitiesMappingListItem[]>(endPointUrl).subscribe(data => {
            if (data) {
                this.entitiesMappingRepository.updateEntitiesMappingList(data);
            }
        });
    }

    getMappingDetails(fieldId: string, sourceId: string): void {
        const httpOptions = {
            headers: new HttpHeaders({
                'InterceptorShowSidenavSpinner': '',
            }),
        };
        let endPointUrl = `${environment.entityApiUrl}/MappingSource/GetEntitySourceMappingField/${sourceId}/${fieldId}`;
        this.httpClient.get<AddEntityMapping>(endPointUrl, httpOptions).subscribe(data => {
            if (data) {
                this.entitiesMappingRepository.updateSelectedMapping(data);
            }
        });
    }

    addMapping(mapping: AddEntityMapping, entitySourceMappingId: string): void {
        let endPointUrl = `${environment.entityApiUrl}/MappingSource/AddEntitySourceMappingField/${entitySourceMappingId}`;
        this.httpClient.post<EntitiesMappingListItem>(endPointUrl, mapping).subscribe(data => {
            if (data) {
                this.entitiesMappingRepository.addMapping(data);
            }
        });
    }

    editMapping(mapping: AddEntityMapping, sourceId: string): void {
        let endPointUrl = `${environment.entityApiUrl}/MappingSource/UpdateEntitySourceMappingField/${sourceId}`;
        this.httpClient.put<EntitiesMappingListItem>(endPointUrl, mapping).subscribe(data => {
            if (data) {
                this.entitiesMappingRepository.updateMapping(data);
            }
        });
    }

    deleteMapping(fieldId: string, sourceId: string): void {
        let endPointUrl = `${environment.entityApiUrl}/MappingSource/DeleteEntitySourceMappingField/${sourceId}/${fieldId}`;
        this.httpClient.delete<{ fields: EntitiesMappingListItem[] }>(endPointUrl).subscribe((data) => {
            this.entitiesMappingRepository.updateEntitiesMappingList(data.fields);
        });
    }
}
