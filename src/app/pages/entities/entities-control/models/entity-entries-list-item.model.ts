import { Section } from "./section.model";

export interface EntityEntriesListItem {
    name: string;
    entityCode: string;
    sections: Section[];
}