import { TemplateElement } from "./template-elements-list-item.model";

export interface AddTemplate {
    entitySectionTemplateId: string;
    name: string;
    fields: TemplateElement[];
}