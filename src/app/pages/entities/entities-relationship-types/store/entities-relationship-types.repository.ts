import { Injectable, Inject } from '@angular/core';
import { AddRelationshipType } from '../models/add-relationship-type.model';
import { EntityTypesListItem } from '../models/entity-types-list-item.model';
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

    updateTypesList(entitiesTypesList: EntityTypesListItem[]): void {
        this.entitiesRelationshipTypesStore.update((state) => ({
            ...state,
            entityTypesList: entitiesTypesList
        }));
    }

    addRelationshipType(addedRelationshipType: RelationshipTypesListItem) {
        this.entitiesRelationshipTypesStore.update((state) => ({
            ...state,
            relationshipTypesList: [addedRelationshipType, ...this.entitiesRelationshipTypesStore.value.relationshipTypesList]
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
        const index = newList.findIndex((e) => e.entityTypeRelationshipId === relationshipType.entityTypeRelationshipId);
        if (index !== -1) {
            newList[index] = relationshipType;
        }

        return newList;
    }
}
