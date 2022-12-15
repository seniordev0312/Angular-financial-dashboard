import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';


export interface SharedModel {
    isSpinning: boolean;
    isSidenavSpinning: boolean;
}

const store = createStore(
    {
        name: 'Shared',
    },
    withProps<SharedModel>({
        isSpinning: false,
        isSidenavSpinning: false
    })
);

export const isSpinning$ = store.pipe(select(({ isSpinning }) => isSpinning));
export const isSidenavSpinning$ = store.pipe(select(({ isSidenavSpinning }) => isSidenavSpinning));

export type SharedStore = typeof store;
export const SHARED_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For Shared Store', {
    providedIn: 'root',
    factory: (): SharedStore => store,
});
