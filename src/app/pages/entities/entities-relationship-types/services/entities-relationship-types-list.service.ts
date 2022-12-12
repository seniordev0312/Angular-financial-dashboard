import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RelationshipTypesListItem } from '../models/relationship-types-list-item.model';
import { EntitiesRelationshipTypesRepository } from '../store/entities-relationship-types.repository';
import { AddRelationshipType } from '../models/add-relationship-type.model';

@Injectable({ providedIn: 'root' })
export class EntitiesRelationshipTypesListService {
    private baseUrl = `${environment.apiUrl}/v1.0/`;

    constructor(private httpClient: HttpClient,
        private entitiesRelationshipTypesRepository: EntitiesRelationshipTypesRepository) { }

    getEntitiesTypesList(pageIndex: number, pageSize: number, backendUrl?: string): void {
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
        this.httpClient.get<RelationshipTypesListItem[]>(endPointUrl, httpOptions).subscribe(data => {
            if (!data) {
                this.entitiesRelationshipTypesRepository.updateRelationshipTypesList(data);
            }
        });
    }

    getTypeDetails(typeId: string): void {
        const endPointUrl = `${this.baseUrl}/${typeId}`
        this.httpClient.get<AddRelationshipType>(endPointUrl).subscribe(data => {
            if (!data) {
                this.entitiesRelationshipTypesRepository.updateSelectedRelationshipType(data);
            }
        });
    }

    addType(type: AddRelationshipType): void {
        this.httpClient.post<RelationshipTypesListItem>(this.baseUrl, type).subscribe(data => {
            if (!data) {
                this.entitiesRelationshipTypesRepository.addRelationshipType(data);
            }
        });
    }

    editType(type: AddRelationshipType): void {
        this.httpClient.put<RelationshipTypesListItem>(this.baseUrl, type).subscribe(data => {
            if (!data) {
                this.entitiesRelationshipTypesRepository.updateRelationshipType(data);
            }
        });
    }

    deleteType(typeId: string): void {
        const endPointUrl = `${this.baseUrl}/${typeId}`
        this.httpClient.delete<void>(endPointUrl).subscribe(() => {
            this.entitiesRelationshipTypesRepository.deleteRelationshipType(typeId);
        });
    }
}
