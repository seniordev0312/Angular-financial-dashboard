import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import {
    persistState,
    sessionStorageStrategy,
} from '@ngneat/elf-persist-state';
import { ElementsListItem } from '../models/element.model';
import { EntitiesListItem } from '../models/entities-list-item.model';
import { EntityDetails } from '../models/entity-details.model';
import { SectionDetails } from '../models/section-details.model';

export interface EntitiesListModel {
    entitiesList: EntitiesListItem[];
    entityDetails: EntityDetails;
    sectionDetails: SectionDetails;
    elementDetails: ElementsListItem;
}

const store = createStore(
    {
        name: 'Entities List',
    },
    withProps<EntitiesListModel>({
        entitiesList: [],
        entityDetails: {} as EntityDetails,
        sectionDetails: {} as SectionDetails,
        elementDetails: {} as ElementsListItem,
    })
);

persistState(store, {
    storage: sessionStorageStrategy,
});

export const entitiesList$ = store.pipe(select(({ entitiesList }) => entitiesList));
export const entityDetails$ = store.pipe(select(({ entityDetails }) => entityDetails));
export const sectionDetails$ = store.pipe(select(({ sectionDetails }) => sectionDetails));
export const elementDetails$ = store.pipe(select(({ elementDetails }) => elementDetails));


export type EntitiesListStore = typeof store;
export const ENTITIES_LIST_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For Entities List Store', {
    providedIn: 'root',
    factory: (): EntitiesListStore => store,
});
