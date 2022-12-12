import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EntitiesListItem } from '../models/entities-list-item.model';
import { AddEntity } from '../models/add-entity.model';
import { EntitiesListRepository } from '../store/entities-list.repository';
import { EntityDetails } from '../models/entity-details.model';

@Injectable({ providedIn: 'root' })
export class EntitiesListService {
    private baseUrl = `${environment.apiUrl}/v1.0/`;

    constructor(private httpClient: HttpClient,
        private entitiesListRepository: EntitiesListRepository) { }

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
        this.httpClient.get<EntitiesListItem[]>(endPointUrl, httpOptions).subscribe(data => {
            if (!data) {
                this.entitiesListRepository.updateEntitiesList(data);
            }
        });
    }

    getEntityDetails(entityId: string): void {
        const endPointUrl = `${this.baseUrl}/${entityId}`
        this.httpClient.get<EntityDetails>(endPointUrl).subscribe(data => {
            if (!data) {
                this.entitiesListRepository.updateEntityDetails(data);
            }
        });
    }

    addEntity(entity: AddEntity): void {
        this.httpClient.post<EntitiesListItem>(this.baseUrl, entity).subscribe(data => {
            if (!data) {
                this.entitiesListRepository.addEntity(data);
            }
        });
    }

    editEntity(entity: AddEntity): void {
        this.httpClient.put<EntitiesListItem>(this.baseUrl, entity).subscribe(data => {
            if (!data) {
                this.entitiesListRepository.updateEntity(data);
            }
        });
    }

    deleteEntity(entityId: string): void {
        const endPointUrl = `${this.baseUrl}/${entityId}`
        this.httpClient.delete<void>(endPointUrl).subscribe(() => {
            this.entitiesListRepository.deleteEntity(entityId);
        });
    }
}
