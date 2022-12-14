import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import {
    persistState,
    sessionStorageStrategy,
} from '@ngneat/elf-persist-state';
import { BaseListItem } from '@root/shared/models/base-list-item.model';


export interface SharedEntitiesModel {
    elementTypesReferenceList: BaseListItem[];
}

const store = createStore(
    {
        name: 'Shared Entities',
    },
    withProps<SharedEntitiesModel>({
        elementTypesReferenceList: []
    })
);

persistState(store, {
    storage: sessionStorageStrategy,
});

export const elementTypesReferenceList$ = store.pipe(select(({ elementTypesReferenceList }) => elementTypesReferenceList));


export type SharedEntitiesStore = typeof store;
export const SHARED_ENTITIES_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For Shared Entities Store', {
    providedIn: 'root',
    factory: (): SharedEntitiesStore => store,
});
