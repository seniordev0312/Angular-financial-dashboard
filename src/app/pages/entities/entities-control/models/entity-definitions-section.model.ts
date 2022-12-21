import { EntityDefinitionsField } from "./entity-definitions-field.model";

export interface EntityDefinitionsSection {
    entitySectionTemplateId: string;
    entityDefinitionId: string;
    entitySectionId: string;
    sectionName: string;
    description: string;
    fields: EntityDefinitionsField[];
}