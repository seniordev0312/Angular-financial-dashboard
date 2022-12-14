import { Injectable, Inject } from '@angular/core';
import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { SharedEntitiesStore, SHARED_ENTITIES_STORE } from './shared-entities.store';

@Injectable({
    providedIn: 'root',
})
export class SharedEntitiesRepository {
    constructor(
        @Inject(SHARED_ENTITIES_STORE) private sharedEntitiesStore: SharedEntitiesStore,
    ) { }

    get values() {
        return this.sharedEntitiesStore.value;
    }

    updateElementTypesReferenceList(data: BaseListItem[]) {
        this.sharedEntitiesStore.update((state) => ({
            ...state,
            elementTypesReferenceList: data
        }));
    }
}
