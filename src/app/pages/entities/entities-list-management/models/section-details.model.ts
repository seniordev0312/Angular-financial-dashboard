import { ElementsListItem } from "./element-list-item.model";

export interface SectionDetails {
    entitySectionTemplateId: string;
    entityDefinitionId: string;
    entitySectionId: string;
    sectionName: string;
    description: string;
    fields: ElementsListItem[];
}