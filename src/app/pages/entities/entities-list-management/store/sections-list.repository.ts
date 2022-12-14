import { Injectable, Inject } from '@angular/core';
import { EntitiesListStore, ENTITIES_LIST_STORE } from './entities-list.store';
import { SectionDetails } from '../models/section-details.model';
import { ElementsListItem } from '../models/element-list-item.model';

@Injectable({
    providedIn: 'root',
})
export class SectionsListRepository {
    constructor(
        @Inject(ENTITIES_LIST_STORE) private entitiesListStore: EntitiesListStore,
    ) { }

    updateSelectedSection(sectionDetails: SectionDetails): void {
        this.entitiesListStore.update((state) => ({
            ...state,
            sectionDetails
        }));
    }

    updateSelectedElement(elementDetails: ElementsListItem): void {
        this.entitiesListStore.update((state) => ({
            ...state,
            elementDetails
        }));
    }

    addSection(section: SectionDetails) {
        this.entitiesListStore.update((state) => ({
            ...state,
            entityDetails: { ...state.entityDetails, sections: [section, ...state.entityDetails.sections] }
        }));
    }

    deleteSection(sectionId: string) {
        this.entitiesListStore.update((state) => ({
            ...state,
            entityDetails: {
                ...state.entityDetails,
                sections: [...state.entityDetails.sections.filter(section => section.entitySectionId === sectionId)]
            }
        }));
    }

}
