import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EntitiesControlRepository } from '../store/entities-control.repository';
import { EntityEntriesList } from '../models/entity-entries-list.model';
import { EntityType } from '../models/entity-type.model';
import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { EntityDefinitionsReferenceListItem } from '../models/entity-definitions-reference-list-item.model';
import { EntityDefinition } from '../models/entity-definitions-list-item.model';
import { AddEntityEntry } from '../models/add-entity.model';

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
        let endPointUrl = `${environment.entityApiUrl}/EntityType/GetEntityTypes`;
        this.httpClient.get<EntityType[]>(endPointUrl).subscribe(data => {
            if (data) {
                const updatedData: BaseListItem[] = data.map(e => ({ id: e.code, value: e.name }))
                this.entitiesControlRepository.updateEntitiesTypesList(updatedData);
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
        let endPointUrl = `${environment.entityApiUrl}/Entity/CreateEntityEntry/${code}`;
        this.httpClient.post<any>(endPointUrl, data).subscribe(data => {
            if (data) {
                console.log(data);
            }
        });
    }
}
