import { Injectable, Inject } from '@angular/core';
import { AddTemplate } from '../models/add-template.model';
import { EntityTemplatesListItem } from '../models/entity-templates-list-item.model';
import { EntitiesTemplatesStore, ENTITIES_TEMPLATES_LIST_STORE } from './entities-templates.store';

@Injectable({
    providedIn: 'root',
})
export class EntitiesTemplatesRepository {
    constructor(
        @Inject(ENTITIES_TEMPLATES_LIST_STORE) private entitiesTemplatesStore: EntitiesTemplatesStore,
    ) { }

    updateSelectedTemplate(template: AddTemplate): void {
        this.entitiesTemplatesStore.update((state) => ({
            ...state,
            templateDetails: template
        }));
    }

    updateTemplatesList(templatesList: EntityTemplatesListItem[]): void {
        this.entitiesTemplatesStore.update((state) => ({
            ...state,
            templatesList
        }));
    }

    addTemplate(addedTemplate: EntityTemplatesListItem) {
        this.entitiesTemplatesStore.update((state) => ({
            ...state,
            templatesList: [addedTemplate, ...this.entitiesTemplatesStore.value.templatesList]
        }));
    }

    deleteTemplate(templateId: string) {
        const templatesList = this.entitiesTemplatesStore.value.templatesList;
        this.entitiesTemplatesStore.update((state) => ({
            ...state,
            templatesList: [...templatesList.filter(element => element.entitySectionTemplateId !== templateId)]
        }));
    }

    updateTemplate(template: EntityTemplatesListItem) {
        this.entitiesTemplatesStore.update((state) => ({
            ...state,
            templatesList: this.getUpdatedTemplatesList(template)
        }));
    }

    getUpdatedTemplatesList(template: EntityTemplatesListItem): EntityTemplatesListItem[] {
        const newList = [...this.entitiesTemplatesStore.value.templatesList];
        const index = newList.findIndex((e) => e.entitySectionTemplateId === template.entitySectionTemplateId);
        if (index !== -1) {
            newList[index] = template;
        }

        return newList;
    }
}
