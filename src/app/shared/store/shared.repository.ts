import { Injectable, Inject } from '@angular/core';
import { SharedStore, SHARED_STORE } from './shared.store';

@Injectable({
    providedIn: 'root',
})
export class SharedRepository {
    constructor(
        @Inject(SHARED_STORE) private sharedStore: SharedStore,
    ) { }

    startSpinning(): void {
        this.sharedStore.update((state) => ({
            ...state,
            isSpinning: true
        }));
    }

    stopSpinning(): void {
        this.sharedStore.update((state) => ({
            ...state,
            isSpinning: false
        }));
    }

    startSidenavSpinning(): void {
        this.sharedStore.update((state) => ({
            ...state,
            isSidenavSpinning: true
        }));
    }

    stopSidenavSpinning(): void {
        this.sharedStore.update((state) => ({
            ...state,
            isSidenavSpinning: false
        }));
    }
}
