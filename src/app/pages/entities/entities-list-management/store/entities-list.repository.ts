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
            entitiesList: state.entitiesList.filter(e => e.id !== entityId)
        }));
    }


    updateEntity(updatedEntity: EntitiesListItem): void {
        this.entitiesListStore.update((state) => ({
            ...state,
            entitiesList: this.getUpdatedEntitiesList(updatedEntity, state.entitiesList)
        }));
    }

    getUpdatedEntitiesList(updatedEntity: EntitiesListItem, entitiesList: EntitiesListItem[]): EntitiesListItem[] {
        const newList = [...entitiesList];
        const index = newList.findIndex((e) => e.id === updatedEntity.id);
        if (index !== -1) {
            newList[index] = updatedEntity;
        }
        return newList;
    }

    updateEntityDetails(entityDetails: EntityDetails) {
        this.entitiesListStore.update((state) => ({
            ...state,
            entityDetails,
        }));
    }
}
