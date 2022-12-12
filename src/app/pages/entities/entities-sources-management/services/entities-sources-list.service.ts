import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EntitiesSourcesListItem } from '../models/entities-sources-list-item.model';
import { EntitiesSourcesRepository } from '../store/entities-sources.repository';
import { AddEntitiesSource } from '../models/add-entity-source.model';

@Injectable({ providedIn: 'root' })
export class EntitiesSourcesListService {
    private baseUrl = `${environment.apiUrl}/v1.0/`;

    constructor(private httpClient: HttpClient,
        private entitiesSourcesRepository: EntitiesSourcesRepository) { }

    getEntitiesSourcesList(pageIndex: number, pageSize: number, backendUrl?: string): void {
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
        this.httpClient.get<EntitiesSourcesListItem[]>(endPointUrl, httpOptions).subscribe(data => {
            if (!data) {
                this.entitiesSourcesRepository.updateSourcesList(data);
            }
        });
    }

    getSourceDetails(sourceId: string): void {
        const endPointUrl = `${this.baseUrl}/${sourceId}`
        this.httpClient.get<AddEntitiesSource>(endPointUrl).subscribe(data => {
            if (!data) {
                this.entitiesSourcesRepository.updateSelectedEntitiesSource(data);
            }
        });
    }

    addSource(source: AddEntitiesSource): void {
        this.httpClient.post<EntitiesSourcesListItem>(this.baseUrl, source).subscribe(data => {
            if (!data) {
                this.entitiesSourcesRepository.addEntitiesSource(data);
            }
        });
    }

    editSource(source: AddEntitiesSource): void {
        this.httpClient.put<EntitiesSourcesListItem>(this.baseUrl, source).subscribe(data => {
            if (!data) {
                this.entitiesSourcesRepository.updateEntitiesSource(data);
            }
        });
    }

    deleteSource(sourceId: string): void {
        const endPointUrl = `${this.baseUrl}/${sourceId}`
        this.httpClient.delete<void>(endPointUrl).subscribe(() => {
            this.entitiesSourcesRepository.deleteEntitiesSource(sourceId);
        });
    }
}
