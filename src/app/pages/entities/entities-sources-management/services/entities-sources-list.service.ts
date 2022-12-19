import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EntitiesSourcesListItem } from '../models/entities-sources-list-item.model';
import { EntitiesSourcesRepository } from '../store/entities-sources.repository';
import { AddEntitiesSource } from '../models/add-entity-source.model';

@Injectable({ providedIn: 'root' })
export class EntitiesSourcesListService {

    constructor(private httpClient: HttpClient,
        private entitiesSourcesRepository: EntitiesSourcesRepository) { }

    getEntitiesSourcesList(): void {
        let endPointUrl = `${environment.entityApiUrl}/MappingSource/GetEntitySources`;
        this.httpClient.get<EntitiesSourcesListItem[]>(endPointUrl).subscribe(data => {
            if (data) {
                this.entitiesSourcesRepository.updateSourcesList(data);
            }
        });
    }

    getSourceDetails(sourceId: string): void {
        const httpOptions = {
            headers: new HttpHeaders({
                'InterceptorShowSidenavSpinner': '',
            }),
        };
        let endPointUrl = `${environment.entityApiUrl}/MappingSource/GetEntitySource/${sourceId}`;
        this.httpClient.get<AddEntitiesSource>(endPointUrl, httpOptions).subscribe(data => {
            if (data) {
                this.entitiesSourcesRepository.updateSelectedEntitiesSource(data);
            }
        });
    }

    addSource(source: AddEntitiesSource): void {
        let endPointUrl = `${environment.entityApiUrl}/MappingSource/AddEntitySource`;
        this.httpClient.post<EntitiesSourcesListItem>(endPointUrl, source).subscribe(data => {
            if (data) {
                this.entitiesSourcesRepository.addEntitiesSource(data);
            }
        });
    }

    editSource(source: AddEntitiesSource): void {
        let endPointUrl = `${environment.entityApiUrl}/MappingSource/UpdateEntitySource/${source.entitySourceId}`;
        this.httpClient.put<EntitiesSourcesListItem>(endPointUrl, source).subscribe(data => {
            if (data) {
                this.entitiesSourcesRepository.updateEntitiesSource(data);
            }
        });
    }

    deleteSource(sourceId: string): void {
        let endPointUrl = `${environment.entityApiUrl}/MappingSource/DeleteEntitySource/${sourceId}`;
        this.httpClient.delete<EntitiesSourcesListItem[]>(endPointUrl).subscribe((data) => {
            if (data) {
                this.entitiesSourcesRepository.updateSourcesList(data);
            }
        });
    }
}
