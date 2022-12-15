import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { AddTemplate } from '../models/add-template.model';
import { EntityTemplatesListItem } from '../models/entity-templates-list-item.model';

export interface EntitiesTemplatesModel {
    templatesList: EntityTemplatesListItem[];
    templateDetails: AddTemplate;
}

const store = createStore(
    {
        name: 'Entities Templates List',
    },
    withProps<EntitiesTemplatesModel>({
        templatesList: [],
        templateDetails: {} as AddTemplate,
    })
);


export const templatesList$ = store.pipe(select(({ templatesList }) => templatesList));
export const templateDetails$ = store.pipe(select(({ templateDetails }) => templateDetails));


export type EntitiesTemplatesStore = typeof store;
export const ENTITIES_TEMPLATES_LIST_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For Entities Templates List Store', {
    providedIn: 'root',
    factory: (): EntitiesTemplatesStore => store,
});
