import { TemplateElement } from "./template-elements-list-item.model";

export interface EntityTemplatesListItem {
    entitySectionTemplateId: string;
    name: string;
    description: string;
    fields: TemplateElement[];
}