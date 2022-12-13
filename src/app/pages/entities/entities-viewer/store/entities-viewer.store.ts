import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import {
    persistState,
    sessionStorageStrategy,
} from '@ngneat/elf-persist-state';
import { EntityTemplate } from '@root/shared/models/entities/entity-template.model';
import { ProfilePreview } from '../models/profile-preview.model';

export interface EntitiesViewerModel {
    profilePreview: ProfilePreview;
    entityInformation: EntityTemplate;
}

const store = createStore(
    {
        name: 'Entities Viewer',
    },
    withProps<EntitiesViewerModel>({
        profilePreview: {} as ProfilePreview,
        entityInformation: {} as EntityTemplate
    })
);

persistState(store, {
    storage: sessionStorageStrategy,
});

export const profilePreview$ = store.pipe(select(({ profilePreview }) => profilePreview));
export const entityInformation$ = store.pipe(select(({ entityInformation }) => entityInformation));


export type EntitiesViewerStore = typeof store;
export const ENTITIES_VIEWER_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For Entities Viewer Store', {
    providedIn: 'root',
    factory: (): EntitiesViewerStore => store,
});
