import { Injectable, Inject } from '@angular/core';
import { EntitiesListStore, ENTITIES_LIST_STORE } from './entities-list.store';
import { EntitiesListItem } from '../models/entities-list-item.model';
import { EntityDetails } from '../models/entity-details.model';

@Injectable({
    providedIn: 'root',
})
export class EntitiesListRepository {
    constructor(
        @Inject(ENTITIES_LIST_STORE) private entitiesListStore: EntitiesListStore,
    ) { }

    get values() {
        return this.entitiesListStore.value;
    }

    updateEntitiesList(entitiesList: EntitiesListItem[]): void {
        this.entitiesListStore.update((state) => ({
            ...state,
            entitiesList,
        }));
    }

    addEntity(entity: EntitiesListItem): void {
        this.entitiesListStore.update((state) => ({
            ...state,
            entitiesList: [entity, ...state.entitiesList],
        }));
    }

    deleteEntity(entityId: string): void {
        this.entitiesListStore.update((state) => ({
            ...state,
            entitiesList: state.entitiesList.filter(e => e.entityDefinitionId !== entityId)
        }));
    }


    updateIsCreateEntityValid(isCreateEntityValid: boolean): void {
        this.entitiesListStore.update((state) => ({
            ...state,
            isCreateEntityValid
        }));
    }


    updateEntityDetails(entityDetails: EntityDetails) {
        this.entitiesListStore.update((state) => ({
            ...state,
            entityDetails,
        }));
    }
}
