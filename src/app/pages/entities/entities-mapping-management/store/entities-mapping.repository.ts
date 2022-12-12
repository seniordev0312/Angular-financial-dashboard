import { Injectable, Inject } from '@angular/core';
import { AddEntityMapping } from '../models/add-entity-mapping.model';
import { EntitiesMappingListItem } from '../models/entities-mapping-list-item.model';
import { EntitiesMappingListStore, ENTITIES_MAPPING_LIST_STORE } from './entities-mapping.store';

@Injectable({
    providedIn: 'root',
})
export class EntitiesMappingRepository {
    constructor(
        @Inject(ENTITIES_MAPPING_LIST_STORE) private entitiesMappingListStore: EntitiesMappingListStore,
    ) { }

    updateSelectedMapping(element: AddEntityMapping): void {
        this.entitiesMappingListStore.update((state) => ({
            ...state,
            mappingDetails: element
        }));
    }

    updateEntitiesMappingList(entitiesMappingList: EntitiesMappingListItem[]): void {
        this.entitiesMappingListStore.update((state) => ({
            ...state,
            entitiesMappingList: entitiesMappingList
        }));
    }

    addMapping(addedMapping: EntitiesMappingListItem) {
        this.entitiesMappingListStore.update((state) => ({
            ...state,
            entitiesMappingList: { ...addedMapping, ...this.entitiesMappingListStore.value.entitiesMappingList }
        }));
    }

    deleteMapping(mappingId: string) {
        const entitiesMappingList = this.entitiesMappingListStore.value.entitiesMappingList;
        this.entitiesMappingListStore.update((state) => ({
            ...state,
            entitiesMappingList: [...entitiesMappingList.filter(element => element.id === mappingId)]
        }));
    }

    updateMapping(mappingDetails: EntitiesMappingListItem) {
        this.entitiesMappingListStore.update((state) => ({
            ...state,
            entitiesMappingList: this.getUpdatedMappingsList(mappingDetails)
        }));
    }

    getUpdatedMappingsList(mappingDetails: EntitiesMappingListItem): EntitiesMappingListItem[] {
        const newList = [...this.entitiesMappingListStore.value.entitiesMappingList];
        const index = newList.findIndex((e) => e.id === mappingDetails.id);
        if (index !== -1) {
            newList[index] = mappingDetails;
        }

        return newList;
    }
}
