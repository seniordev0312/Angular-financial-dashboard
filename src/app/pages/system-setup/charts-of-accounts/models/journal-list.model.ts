import { JournalItem } from "./journal-item.model";

export interface JournalList {
    journalItemsCount: number;
    paginatedJournalItems: JournalItem[];
}