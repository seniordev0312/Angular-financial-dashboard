import { EntityEntriesListItem } from "./entity-entries-list-item.model";

export interface EntityEntriesList {
    totalPages: number;
    entityRecordItems: EntityEntriesListItem[];
}