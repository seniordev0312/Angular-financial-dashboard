import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import {
    persistState,
    sessionStorageStrategy,
} from '@ngneat/elf-persist-state';

import { EntitiesControlListItem } from '../models/entities-control-list-item.model';

export interface EntitiesControlModel {
    entitiesList: EntitiesControlListItem[];
    selectedEntity: EntitiesControlListItem;
}

const store = createStore(
    {
        name: 'Entities Control List',
    },
    withProps<EntitiesControlModel>({
        entitiesList: [],
        selectedEntity: {} as EntitiesControlListItem
    })
);

persistState(store, {
    storage: sessionStorageStrategy,
});

export const entitiesList$ = store.pipe(select(({ entitiesList }) => entitiesList));
export const selectedEntity$ = store.pipe(select(({ selectedEntity }) => selectedEntity));


export type EntitiesControlStore = typeof store;
export const ENTITIES_CONTROL_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For Entities Control Store', {
    providedIn: 'root',
    factory: (): EntitiesControlStore => store,
});
