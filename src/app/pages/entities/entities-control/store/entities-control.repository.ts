import { Injectable, Inject } from '@angular/core';
import { DynamicFilter } from '../models/dynamic-filter.model';
import { EntityDefinition } from '../models/entity-definitions-list-item.model';
import { EntityDefinitionsReferenceListItem } from '../models/entity-definitions-reference-list-item.model';
import { EntityEntriesListItem } from '../models/entity-entries-list-item.model';
import { EntityEntriesList } from '../models/entity-entries-list.model';
import { EntityType } from '../models/entity-type.model';
import { EntitiesControlStore, ENTITIES_CONTROL_STORE } from './entities-control.store';

@Injectable({
    providedIn: 'root',
})
export class EntitiesControlRepository {
    constructor(
        @Inject(ENTITIES_CONTROL_STORE) private entitiesControlStore: EntitiesControlStore,
    ) { }


    updateEntitiesList(entitiesList: EntityEntriesList): void {
        this.entitiesControlStore.update((state) => ({
            ...state,
            entitiesList: entitiesList
        }));
    }

    updateSelectedEntityEntry(selectedEntity: EntityEntriesListItem): void {
        this.entitiesControlStore.update((state) => ({
            ...state,
            selectedEntity
        }));
    }


    updateEntitiesTypesList(entityTypes: EntityType[]): void {
        this.entitiesControlStore.update((state) => ({
            ...state,
            entityTypes
        }));
    }


    updateEntityDynamicFiltersList(dynamicFiltersList: DynamicFilter[]): void {
        this.entitiesControlStore.update((state) => ({
            ...state,
            dynamicFiltersList
        }));
    }

    updateEntitiesDefinitionsReferenceList(entityDefinitionsReferenceList: EntityDefinitionsReferenceListItem[]): void {
        this.entitiesControlStore.update((state) => ({
            ...state,
            entityDefinitionsReferenceList
        }));
    }

    updateEntitiesDefinitionsList(entityDefinition: EntityDefinition): void {
        this.entitiesControlStore.update((state) => ({
            ...state,
            entityDefinition
        }));
    }
}
