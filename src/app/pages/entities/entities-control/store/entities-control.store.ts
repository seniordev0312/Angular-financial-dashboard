import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { EntitiesTableItem } from '../models/entities-table-item.model';
import { EntityDefinition } from '../models/entity-definitions-list-item.model';
import { EntityDefinitionsReferenceListItem } from '../models/entity-definitions-reference-list-item.model';
import { EntityEntriesList } from '../models/entity-entries-list.model';

export interface EntitiesControlModel {
    entitiesList: EntityEntriesList;
    selectedEntity: EntitiesTableItem;
    entityTypes: BaseListItem[];
    entityDefinitionsReferenceList: EntityDefinitionsReferenceListItem[];
    entityDefinition: EntityDefinition;
}

const store = createStore(
    {
        name: 'Entities Control List',
    },
    withProps<EntitiesControlModel>({
        entitiesList: {} as EntityEntriesList,
        selectedEntity: {} as EntitiesTableItem,
        entityTypes: [],
        entityDefinitionsReferenceList: [],
        entityDefinition: {} as EntityDefinition
    })
);


export const entitiesList$ = store.pipe(select(({ entitiesList }) => entitiesList));
export const selectedEntity$ = store.pipe(select(({ selectedEntity }) => selectedEntity));
export const entityTypes$ = store.pipe(select(({ entityTypes }) => entityTypes));
export const entityDefinitionsReferenceList$ = store.pipe(select(({ entityDefinitionsReferenceList }) => entityDefinitionsReferenceList));
export const entityDefinition$ = store.pipe(select(({ entityDefinition }) => entityDefinition));


export type EntitiesControlStore = typeof store;
export const ENTITIES_CONTROL_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For Entities Control Store', {
    providedIn: 'root',
    factory: (): EntitiesControlStore => store,
});
