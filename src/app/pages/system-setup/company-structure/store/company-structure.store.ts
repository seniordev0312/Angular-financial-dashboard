import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import {
    persistState,
    sessionStorageStrategy,
} from '@ngneat/elf-persist-state';
import { TreeNode } from 'primeng/api';

export interface CompanyStructureModel {
    treeNode: TreeNode[];
}

const store = createStore(
    {
        name: 'company-structure-store',
    },
    withProps<CompanyStructureModel>({
        treeNode: null,
    })
);

persistState(store, {
    storage: sessionStorageStrategy,
});

export const treeNode$ = store.pipe(select(({ treeNode }) => treeNode));

export type CompanyStructureStore = typeof store;
export const COMPANY_STRUCTURE_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For Company Structure Store', {
    providedIn: 'root',
    factory: (): CompanyStructureStore => store,
});
