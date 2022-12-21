export interface JournalItem {
    journalId: number;
    journalName: string;
    accountName: string;
    accountCode: string;
    documentNumber: string;
    reference: string;
    postingDate: string;
    journalItemId: number;
    journalEntryId: number;
    accountId: number;
    name: null,
    sequence: number;
    dueDate: null,
    debit: number;
    credit: number;
    amountCurrency: number;
    amountResidual: number;
    amountResidualCurrency: number;
    balance: number;
}