import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EntitiesListItem } from '../models/entities-list-item.model';
import { EntitiesListRepository } from '../store/entities-list.repository';
import { EntityDetails } from '../models/entity-details.model';

@Injectable({ providedIn: 'root' })
export class EntitiesListService {

    constructor(private httpClient: HttpClient,
        private entitiesListRepository: EntitiesListRepository) { }

    getEntitiesList(): void {
        const endPointUrl = `${environment.entityApiUrl}/EntityDefinition/GetEntityDefinitions`;

        this.httpClient.get<EntitiesListItem[]>(endPointUrl).subscribe(data => {
            if (data) {
                this.entitiesListRepository.updateEntitiesList(data);
            }
        });
    }

    getEntityDetails(entityCode: string): void {
        const endPointUrl = `${environment.entityApiUrl}/EntityDefinition/GetEntityDefinition/${entityCode}`
        this.httpClient.get<EntityDetails>(endPointUrl).subscribe(data => {
            if (data) {
                this.entitiesListRepository.updateEntityDetails(data);
            }
        });
    }


    deleteEntity(entityId: string): void {
        const endPointUrl = `${environment.entityApiUrl}/EntityDefinition/GetEntityDefinition/${entityId}`
        this.httpClient.delete<void>(endPointUrl).subscribe(() => {
            this.entitiesListRepository.deleteEntity(entityId);
        });
    }

    checkCreateEntityValidation(entityName: string, entityCode: string) {
        const endPointUrl = `${environment.entityApiUrl}/EntityType/ValidateNewEntityCreation/${entityCode}/${entityName}`
        this.httpClient.get<{ canCreateEntity: boolean }>(endPointUrl).subscribe((data) => {
            this.entitiesListRepository.updateEntityDetails({ ...this.entitiesListRepository.values.entityDetails, entityName, entityCode } as EntityDetails);
            this.entitiesListRepository.updateIsCreateEntityValid(data.canCreateEntity);
        });
    }
}
