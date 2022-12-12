import { Injectable, Inject } from '@angular/core';
import { ElementsListItem } from '../models/element.model';
import { SectionDetails } from '../models/section-details.model';
import { EntitiesListStore, ENTITIES_LIST_STORE } from './entities-list.store';

@Injectable({
    providedIn: 'root',
})
export class ElementsListRepository {
    constructor(
        @Inject(ENTITIES_LIST_STORE) private entitiesListStore: EntitiesListStore,
    ) { }

    updateSelectedElement(element: ElementsListItem): void {
        this.entitiesListStore.update((state) => ({
            ...state,
            elementDetails: element
        }));
    }

    addElement(element: ElementsListItem, sectionId: string) {
        const addedElement = { id: element.id, name: element.name };
        const sectionDetails = this.entitiesListStore.value.entityDetails.sections.find(e => e.id === sectionId);
        this.entitiesListStore.update((state) => ({
            ...state,
            sectionDetails: { ...sectionDetails, elements: [addedElement, ...sectionDetails.elements] }
        }));
    }

    deleteElement(elementId: string, sectionId: string) {
        const sectionDetails = this.entitiesListStore.value.entityDetails.sections.find(e => e.id === sectionId);
        this.entitiesListStore.update((state) => ({
            ...state,
            sectionDetails: {
                ...sectionDetails,
                elements: [...sectionDetails.elements.filter(element => element.id === elementId)]
            }
        }));
    }

    updateElement(element: ElementsListItem, sectionId: string) {
        const entityDetails = this.entitiesListStore.value.entityDetails

        this.entitiesListStore.update((state) => ({
            ...state,
            entityDetails: {
                ...entityDetails,
                sections: this.getUpdatedSectionsList(element, sectionId)
            }
        }));
    }

    getUpdatedSectionsList(element: ElementsListItem, sectionId: string): SectionDetails[] {
        const sectionDetails = this.entitiesListStore.value.entityDetails.sections.find(e => e.id === sectionId);
        const sectionIndex = this.entitiesListStore.value.entityDetails.sections.findIndex(e => e.id === sectionId);

        const entityDetails = this.entitiesListStore.value.entityDetails

        const newList = [...sectionDetails.elements];
        const index = newList.findIndex((e) => e.id === element.id);
        if (index !== -1) {
            newList[index] = {
                id: element.id,
                name: element.name
            };
        }

        entityDetails.sections[sectionIndex] = { ...sectionDetails, elements: newList };
        return entityDetails.sections;
    }
}
