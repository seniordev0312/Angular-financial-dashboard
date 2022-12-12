import { Injectable, Inject } from '@angular/core';
import { EntitiesListStore, ENTITIES_LIST_STORE } from './entities-list.store';
import { SectionDetails } from '../models/section-details.model';

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
                sections: [...state.entityDetails.sections.filter(section => section.id === sectionId)]
            }
        }));
    }

    updateSection(section: SectionDetails) {
        this.entitiesListStore.update((state) => ({
            ...state,
            entityDetails: {
                ...state.entityDetails,
                sections: this.getUpdatedSectionsList(section)
            }
        }));
    }

    getUpdatedSectionsList(section: SectionDetails): SectionDetails[] {
        const entityDetails = this.entitiesListStore.value.entityDetails;
        const newList = [...entityDetails.sections];
        const index = newList.findIndex((e) => e.id === section.id);
        if (index !== -1) {
            newList[index] = section;
        }
        return newList;
    }
}
