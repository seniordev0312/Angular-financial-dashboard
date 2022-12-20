import { JournalItemsModel } from "./journal-items.model";

export interface JournalEntryModel {
    journalEntryId: number, // 0 Or 1
    type: number, // General = 0, Invoice = 1, CreditNote = 2, Bill = 3, Refund = 4
    journalId: number, // GetJournalsByEntryType endpoint
    entryName: string, // Invoice No
    description: string,
    state: number, // Draft = 0,  Posted = 1, Closed = 2
    currencyId: number, // currency drop down
    entryDate: string, // Bill Date
    postDate: string, // Posting Month 
    dueDate: string,  // Bill Due Date
    source: string, // // Link of the attached document
    contactEin: string,
    bookId: 0, // 1 for now
    journalItems: JournalItemsModel[]
}
