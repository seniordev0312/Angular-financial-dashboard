import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EntitiesControlRepository } from '../store/entities-control.repository';
import { EntityEntriesList } from '../models/entity-entries-list.model';
import { EntityType } from '../models/entity-type.model';
import { EntityDefinitionsReferenceListItem } from '../models/entity-definitions-reference-list-item.model';
import { EntityDefinition } from '../models/entity-definitions-list-item.model';
import { AddEntityEntry } from '../models/add-entity.model';
import { EntityEntriesListItem } from '../models/entity-entries-list-item.model';
import { DynamicFilter } from '../models/dynamic-filter.model';

@Injectable({ providedIn: 'root' })
export class EntitiesControlService {

    constructor(private httpClient: HttpClient,
        private entitiesControlRepository: EntitiesControlRepository) { }

    getEntitiesList(pageIndex: number, pageSize: number, code: string): void {
        let endPointUrl = `${environment.entityApiUrl}/Entity/GetEntityEntries/${code}/${pageIndex}/${pageSize}`;
        this.httpClient.get<EntityEntriesList>(endPointUrl).subscribe(data => {
            if (data) {
                this.entitiesControlRepository.updateEntitiesList(data);
            }
        });
    }

    getEntityTypesList(): void {
        let endPointUrl = `${environment.entityApiUrl}/EntityDefinition/GetEntityDefinitions`;
        this.httpClient.get<EntityType[]>(endPointUrl).subscribe(data => {
            if (data) {
                this.entitiesControlRepository.updateEntitiesTypesList(data);
            }
        });
    }

    getEntityDefinitionsReferenceList(): void {
        let endPointUrl = `${environment.entityApiUrl}/EntityDefinition/GetEntityDefinitions`;
        this.httpClient.get<EntityDefinitionsReferenceListItem[]>(endPointUrl).subscribe(data => {
            if (data) {
                this.entitiesControlRepository.updateEntitiesDefinitionsReferenceList(data);
            }
        });
    }

    getEntityDefinitionsList(code: string): void {
        let endPointUrl = `${environment.entityApiUrl}/EntityDefinition/GetEntityDefinition/${code}`;
        this.httpClient.get<EntityDefinition>(endPointUrl).subscribe(data => {
            if (data) {
                this.entitiesControlRepository.updateEntitiesDefinitionsList(data);
            }
        });
    }

    addEntityEntry(data: AddEntityEntry, code: string): void {
        console.log('data', data)
        console.log('code', code)
        let endPointUrl = `${environment.entityApiUrl}/Entity/CreateEntityEntry/${code}`;
        this.httpClient.post<any>(endPointUrl, data).subscribe(data => {
            if (data) {
                this.entitiesControlRepository.updateEntityAddState(true);
                console.log('result', data)
            }
        });
    }

    updateEntityEntry(data: AddEntityEntry, ein: string): void {
        console.log('Data', data);
        console.log('Ein', ein);
        let endPointUrl = `${environment.entityApiUrl}/Entity/UpdateEntityEntry/${ein}`;
        this.httpClient.put<any>(endPointUrl, data).subscribe(data => {
            if (data) {
                console.log(data);
            }
        });
    }

    getEntityEntryDetails(ein: string): void {
        let endPointUrl = `${environment.entityApiUrl}/Entity/GetEntityEntry/${ein}`;
        this.httpClient.get<EntityEntriesListItem>(endPointUrl).subscribe(data => {
            if (data) {
                this.entitiesControlRepository.updateSelectedEntityEntry(data);
            }
        });
    }

    getEntityDynamicFiltersList(id: string): void {
        let endPointUrl = `${environment.entityApiUrl}/EntityDefinition/GetEntityDefinitionDynamicFilters/${id}`;
        this.httpClient.get<DynamicFilter[]>(endPointUrl).subscribe(data => {
            if (data) {
                this.entitiesControlRepository.updateEntityDynamicFiltersList(data);
            }
        });
    }

    getSimilarEntity(data: AddEntityEntry, code: string): void {
        let endPointUrl = `${environment.entityApiUrl}/Entity/FindSimilarEntities/${code}`;
        this.httpClient.post<any>(endPointUrl, data).subscribe(data => {
            if (data) {
                this.entitiesControlRepository.updateEntitySimilarityModel(data);
            }
        });
    }

    checkSimilarEntity(data: AddEntityEntry, code: string) {
        let endPointUrl = `${environment.entityApiUrl}/Entity/FindSimilarEntities/${code}`;
        const header = {
            headers: new HttpHeaders({
            })
        };
        return this.httpClient.post(endPointUrl, data, header);
    }

}
