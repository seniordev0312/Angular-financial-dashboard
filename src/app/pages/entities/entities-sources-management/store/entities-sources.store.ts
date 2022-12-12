import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import {
    persistState,
    sessionStorageStrategy,
} from '@ngneat/elf-persist-state';
import { AddEntitiesSource } from '../models/add-entity-source.model';
import { EntitiesSourcesListItem } from '../models/entities-sources-list-item.model';

export interface EntitiesSourcingModel {
    entitiesSourcesList: EntitiesSourcesListItem[];
    entitiesSourceDetails: AddEntitiesSource;
}

const store = createStore(
    {
        name: 'Entities Sourcing List',
    },
    withProps<EntitiesSourcingModel>({
        entitiesSourcesList: [],
        entitiesSourceDetails: {} as AddEntitiesSource,
    })
);

persistState(store, {
    storage: sessionStorageStrategy,
});

export const entitiesSourcesList$ = store.pipe(select(({ entitiesSourcesList }) => entitiesSourcesList));
export const entitiesSourceDetails$ = store.pipe(select(({ entitiesSourceDetails }) => entitiesSourceDetails));


export type EntitiesSourcesStore = typeof store;
export const ENTITIES_Sources_LIST_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For Entities Sources List Store', {
    providedIn: 'root',
    factory: (): EntitiesSourcesStore => store,
});
