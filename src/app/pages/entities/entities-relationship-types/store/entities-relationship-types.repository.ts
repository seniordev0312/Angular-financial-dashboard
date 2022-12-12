import { Injectable, Inject } from '@angular/core';
import { AddRelationshipType } from '../models/add-relationship-type.model';
import { RelationshipTypesListItem } from '../models/relationship-types-list-item.model';
import { EntitiesRelationshipTypesStore, ENTITIES_Relationship_Types_LIST_STORE } from './entities-relationship-types.store';

@Injectable({
    providedIn: 'root',
})
export class EntitiesRelationshipTypesRepository {
    constructor(
        @Inject(ENTITIES_Relationship_Types_LIST_STORE) private entitiesRelationshipTypesStore: EntitiesRelationshipTypesStore,
    ) { }

    updateSelectedRelationshipType(relationshipType: AddRelationshipType): void {
        this.entitiesRelationshipTypesStore.update((state) => ({
            ...state,
            relationshipTypeDetails: relationshipType
        }));
    }

    updateRelationshipTypesList(entitiesRelationshipTypesList: RelationshipTypesListItem[]): void {
        this.entitiesRelationshipTypesStore.update((state) => ({
            ...state,
            relationshipTypesList: entitiesRelationshipTypesList
        }));
    }

    addRelationshipType(addedRelationshipType: RelationshipTypesListItem) {
        this.entitiesRelationshipTypesStore.update((state) => ({
            ...state,
            relationshipTypesList: { ...addedRelationshipType, ...this.entitiesRelationshipTypesStore.value.relationshipTypesList }
        }));
    }

    deleteRelationshipType(mappingId: string) {
        const relationshipTypesList = this.entitiesRelationshipTypesStore.value.relationshipTypesList;
        this.entitiesRelationshipTypesStore.update((state) => ({
            ...state,
            relationshipTypesList: [...relationshipTypesList.filter(element => element.id === mappingId)]
        }));
    }

    updateRelationshipType(relationshipType: RelationshipTypesListItem) {
        this.entitiesRelationshipTypesStore.update((state) => ({
            ...state,
            relationshipTypesList: this.getUpdatedRelationshipTypesList(relationshipType)
        }));
    }

    getUpdatedRelationshipTypesList(relationshipType: RelationshipTypesListItem): RelationshipTypesListItem[] {
        const newList = [...this.entitiesRelationshipTypesStore.value.relationshipTypesList];
        const index = newList.findIndex((e) => e.id === relationshipType.id);
        if (index !== -1) {
            newList[index] = relationshipType;
        }

        return newList;
    }
}
