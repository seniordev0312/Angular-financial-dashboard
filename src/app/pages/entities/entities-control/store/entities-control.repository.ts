import { Injectable, Inject } from '@angular/core';
import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { EntitiesTableItem } from '../models/entities-table-item.model';
import { EntityDefinition } from '../models/entity-definitions-list-item.model';
import { EntityDefinitionsReferenceListItem } from '../models/entity-definitions-reference-list-item.model';
import { EntityEntriesList } from '../models/entity-entries-list.model';
import { EntitiesControlStore, ENTITIES_CONTROL_STORE } from './entities-control.store';

@Injectable({
    providedIn: 'root',
})
export class EntitiesControlRepository {
    constructor(
        @Inject(ENTITIES_CONTROL_STORE) private entitiesControlStore: EntitiesControlStore,
    ) { }

    updateSelectedRelationshipType(entitiesControlListItem: EntitiesTableItem): void {
        this.entitiesControlStore.update((state) => ({
            ...state,
            selectedEntity: entitiesControlListItem
        }));
    }

    updateEntitiesList(entitiesList: EntityEntriesList): void {
        this.entitiesControlStore.update((state) => ({
            ...state,
            entitiesList: entitiesList
        }));
    }

    updateEntitiesTypesList(entityTypes: BaseListItem[]): void {
        this.entitiesControlStore.update((state) => ({
            ...state,
            entityTypes
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
