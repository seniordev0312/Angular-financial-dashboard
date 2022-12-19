import { TaxModel } from "./tax.model";

export interface JournalItemsModel {
    journalItemId: number,
    sequence: number, // Local Id
    accountId: number, // Search Account endpoint
    productEin: string, // Text
    debit: number,
    credit: number,
    description: string,
    taxes: TaxModel[] // Get Taxes endpoint.by Product Ein
}


