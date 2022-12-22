import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { DynamicFilter } from '../models/dynamic-filter.model';
import { EntityDefinition } from '../models/entity-definitions-list-item.model';
import { EntityDefinitionsReferenceListItem } from '../models/entity-definitions-reference-list-item.model';
import { EntityEntriesListItem } from '../models/entity-entries-list-item.model';
import { EntityEntriesList } from '../models/entity-entries-list.model';
import { EntityType } from '../models/entity-type.model';

export interface EntitiesControlModel {
    entitiesList: EntityEntriesList;
    selectedEntity: EntityEntriesListItem;
    entityTypes: EntityType[];
    entityDefinitionsReferenceList: EntityDefinitionsReferenceListItem[];
    entityDefinition: EntityDefinition;
    dynamicFiltersList: DynamicFilter[]
}

const store = createStore(
    {
        name: 'Entities Control List',
    },
    withProps<EntitiesControlModel>({
        entitiesList: {} as EntityEntriesList,
        selectedEntity: {} as EntityEntriesListItem,
        entityTypes: [],
        entityDefinitionsReferenceList: [],
        entityDefinition: {} as EntityDefinition,
        dynamicFiltersList: []
    })
);


export const entitiesList$ = store.pipe(select(({ entitiesList }) => entitiesList));
export const selectedEntity$ = store.pipe(select(({ selectedEntity }) => selectedEntity));
export const entityTypes$ = store.pipe(select(({ entityTypes }) => entityTypes));
export const entityDefinitionsReferenceList$ = store.pipe(select(({ entityDefinitionsReferenceList }) => entityDefinitionsReferenceList));
export const entityDefinition$ = store.pipe(select(({ entityDefinition }) => entityDefinition));
export const dynamicFiltersList$ = store.pipe(select(({ dynamicFiltersList }) => dynamicFiltersList));


export type EntitiesControlStore = typeof store;
export const ENTITIES_CONTROL_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For Entities Control Store', {
    providedIn: 'root',
    factory: (): EntitiesControlStore => store,
});
