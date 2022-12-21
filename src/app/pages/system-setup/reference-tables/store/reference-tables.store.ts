import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';

export interface ReferenceTablesModel {
    referenceTables: any;
}

const store = createStore(
    {
        name: 'Reference Tables List',
    },
    withProps<ReferenceTablesModel>({
        referenceTables: [],
    })
);


export const referenceTables$ = store.pipe(select(({ referenceTables }) => referenceTables));


export type ReferenceTablesStore = typeof store;
export const REFERENCE_TABLE_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For Reference Tables List Store', {
    providedIn: 'root',
    factory: (): ReferenceTablesStore => store,
});
