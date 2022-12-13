import { Injectable, Inject } from '@angular/core';
import { EntityTemplate } from '@root/shared/models/entities/entity-template.model';
import { ProfilePreview } from '../models/profile-preview.model';
import { EntitiesViewerStore, ENTITIES_VIEWER_STORE } from './entities-viewer.store';

@Injectable({
    providedIn: 'root',
})
export class EntitiesViewerRepository {
    constructor(
        @Inject(ENTITIES_VIEWER_STORE) private entitiesViewerStore: EntitiesViewerStore,
    ) { }

    updateProfileOverview(data: ProfilePreview): void {
        this.entitiesViewerStore.update((state) => ({
            ...state,
            profilePreview: data
        }));
    }

    updateEntityInformation(data: EntityTemplate): void {
        this.entitiesViewerStore.update((state) => ({
            ...state,
            entityInformation: data
        }));
    }
}
