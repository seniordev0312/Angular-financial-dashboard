import { Injectable, Inject } from '@angular/core';
import { AddEntitiesSource } from '../models/add-entity-source.model';
import { EntitiesSourcesListItem } from '../models/entities-sources-list-item.model';
import { EntitiesSourcesStore, ENTITIES_Sources_LIST_STORE } from './entities-sources.store';

@Injectable({
    providedIn: 'root',
})
export class EntitiesSourcesRepository {
    constructor(
        @Inject(ENTITIES_Sources_LIST_STORE) private entitiesSourcesStore: EntitiesSourcesStore,
    ) { }

    updateSelectedEntitiesSource(entitiesSource: AddEntitiesSource): void {
        this.entitiesSourcesStore.update((state) => ({
            ...state,
            entitiesSourceDetails: entitiesSource
        }));
    }

    updateSourcesList(entitiesSourcesList: EntitiesSourcesListItem[]): void {
        this.entitiesSourcesStore.update((state) => ({
            ...state,
            entitiesSourcesList: entitiesSourcesList
        }));
    }

    addEntitiesSource(addedEntitiesSource: EntitiesSourcesListItem) {
        this.entitiesSourcesStore.update((state) => ({
            ...state,
            entitiesSourcesList: [addedEntitiesSource, ...this.entitiesSourcesStore.value.entitiesSourcesList]
        }));
    }

    updateEntitiesSource(EntitiesSource: EntitiesSourcesListItem) {
        this.entitiesSourcesStore.update((state) => ({
            ...state,
            entitiesSourcesList: this.getUpdatedEntitiesSourcesList(EntitiesSource)
        }));
    }

    getUpdatedEntitiesSourcesList(entitiesSource: EntitiesSourcesListItem): EntitiesSourcesListItem[] {
        const newList = [...this.entitiesSourcesStore.value.entitiesSourcesList];
        const index = newList.findIndex((e) => e.entitySourceId === entitiesSource.entitySourceId);
        if (index !== -1) {
            newList[index] = entitiesSource;
        }

        return newList;
    }
}
