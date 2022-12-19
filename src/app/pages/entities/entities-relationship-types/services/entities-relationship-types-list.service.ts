import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RelationshipTypesListItem } from '../models/relationship-types-list-item.model';
import { EntitiesRelationshipTypesRepository } from '../store/entities-relationship-types.repository';
import { AddRelationshipType } from '../models/add-relationship-type.model';
import { EntityTypesListItem } from '../models/entity-types-list-item.model';

@Injectable({ providedIn: 'root' })
export class EntitiesRelationshipTypesListService {
    constructor(private httpClient: HttpClient,
        private entitiesRelationshipTypesRepository: EntitiesRelationshipTypesRepository) { }

    getEntityRelationshipTypesList(): void {
        let endPointUrl = `${environment.entityApiUrl}/EntityRelationship/GetRelationshipTypes`;
        this.httpClient.get<RelationshipTypesListItem[]>(endPointUrl).subscribe(data => {
            if (data) {
                this.entitiesRelationshipTypesRepository.updateRelationshipTypesList(data);
            }
        });
    }

    getEntitiesTypesList(): void {
        const httpOptions = {
            headers: new HttpHeaders({
                'InterceptorHideSpinner': '',
            }),
        };
        let endPointUrl = `${environment.entityApiUrl}/EntityType/GetEntityTypes`;
        this.httpClient.get<EntityTypesListItem[]>(endPointUrl, httpOptions).subscribe(data => {
            if (data) {
                this.entitiesRelationshipTypesRepository.updateTypesList(data);
            }
        });
    }

    getTypeDetails(typeId: string): void {
        const httpOptions = {
            headers: new HttpHeaders({
                'InterceptorShowSidenavSpinner': '',
            }),
        };
        let endPointUrl = `${environment.entityApiUrl}/EntityRelationship/GetRelationshipType/${typeId}`;
        this.httpClient.get<AddRelationshipType>(endPointUrl, httpOptions).subscribe(data => {
            if (data) {
                this.entitiesRelationshipTypesRepository.updateSelectedRelationshipType(data);
            }
        });
    }

    addType(type: AddRelationshipType): void {
        let endPointUrl = `${environment.entityApiUrl}/EntityRelationship/AddNewRelationshipType`;
        this.httpClient.post<RelationshipTypesListItem>(endPointUrl, type).subscribe(data => {
            if (data) {
                this.entitiesRelationshipTypesRepository.addRelationshipType(data);
            }
        });
    }

    editType(type: AddRelationshipType): void {
        let endPointUrl = `${environment.entityApiUrl}/EntityRelationship/UpdateRelationshipType/${type.entityTypeRelationshipId}`;
        this.httpClient.put<RelationshipTypesListItem>(endPointUrl, type).subscribe(data => {
            if (data) {
                this.entitiesRelationshipTypesRepository.updateRelationshipType(data);
            }
        });
    }

    deleteType(typeId: string): void {
        let endPointUrl = `${environment.entityApiUrl}/EntityRelationship/DeleteRelationshipType/${typeId}`;
        this.httpClient.delete<RelationshipTypesListItem[]>(endPointUrl).subscribe((data) => {
            this.entitiesRelationshipTypesRepository.updateRelationshipTypesList(data);
        });
    }
}
