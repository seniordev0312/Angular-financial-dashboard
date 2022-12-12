import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import {
    persistState,
    sessionStorageStrategy,
} from '@ngneat/elf-persist-state';

import { AddEntityMapping } from '../models/add-entity-mapping.model';
import { EntitiesMappingListItem } from '../models/entities-mapping-list-item.model';

export interface EntitiesMappingModel {
    entitiesMappingList: EntitiesMappingListItem[];
    mappingDetails: AddEntityMapping;
}

const store = createStore(
    {
        name: 'Entities Mapping List',
    },
    withProps<EntitiesMappingModel>({
        entitiesMappingList: [],
        mappingDetails: {} as AddEntityMapping,
    })
);

persistState(store, {
    storage: sessionStorageStrategy,
});

export const entitiesMappingList$ = store.pipe(select(({ entitiesMappingList }) => entitiesMappingList));
export const mappingDetails$ = store.pipe(select(({ mappingDetails }) => mappingDetails));


export type EntitiesMappingListStore = typeof store;
export const ENTITIES_MAPPING_LIST_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For Entities Mapping List Store', {
    providedIn: 'root',
    factory: (): EntitiesMappingListStore => store,
});
