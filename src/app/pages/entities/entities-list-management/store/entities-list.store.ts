import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { ElementsListItem } from '../models/element-list-item.model';
import { EntitiesListItem } from '../models/entities-list-item.model';
import { EntityDetails } from '../models/entity-details.model';
import { SectionDetails } from '../models/section-details.model';

export interface EntitiesListModel {
    entitiesList: EntitiesListItem[];
    entityDetails: EntityDetails;
    sectionDetails: SectionDetails;
    elementDetails: ElementsListItem;
    isCreateEntityValid: boolean;
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
        isCreateEntityValid: null
    })
);

export const entitiesList$ = store.pipe(select(({ entitiesList }) => entitiesList));
export const entityDetails$ = store.pipe(select(({ entityDetails }) => entityDetails));
export const sectionDetails$ = store.pipe(select(({ sectionDetails }) => sectionDetails));
export const elementDetails$ = store.pipe(select(({ elementDetails }) => elementDetails));
export const isCreateEntityValid$ = store.pipe(select(({ isCreateEntityValid }) => isCreateEntityValid));


export type EntitiesListStore = typeof store;
export const ENTITIES_LIST_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For Entities List Store', {
    providedIn: 'root',
    factory: (): EntitiesListStore => store,
});
