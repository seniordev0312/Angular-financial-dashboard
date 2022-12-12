import { Injectable, Inject } from '@angular/core';
import { EntitiesControlListItem } from '../models/entities-control-list-item.model';
import { EntitiesControlStore, ENTITIES_CONTROL_STORE } from './entities-control-types.store';

@Injectable({
    providedIn: 'root',
})
export class EntitiesControlRepository {
    constructor(
        @Inject(ENTITIES_CONTROL_STORE) private entitiesControlStore: EntitiesControlStore,
    ) { }

    updateSelectedRelationshipType(entitiesControlListItem: EntitiesControlListItem): void {
        this.entitiesControlStore.update((state) => ({
            ...state,
            selectedEntity: entitiesControlListItem
        }));
    }

    updateEntitiesList(entitiesList: EntitiesControlListItem[]): void {
        this.entitiesControlStore.update((state) => ({
            ...state,
            entitiesList: entitiesList
        }));
    }
}
