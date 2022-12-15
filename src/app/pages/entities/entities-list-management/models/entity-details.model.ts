import { SectionDetails } from "./section-details.model";

export interface EntityDetails {
    entityDefinitionId: string;
    entityName: string;
    entityCode: string;
    sections: SectionDetails[];
}