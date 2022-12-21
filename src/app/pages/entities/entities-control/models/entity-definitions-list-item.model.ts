import { EntityDefinitionsSection } from "./entity-definitions-section.model";

export interface EntityDefinition {
    entityDefinitionId: string;
    entityName: string;
    entityCode: string;
    sections: EntityDefinitionsSection[];
}