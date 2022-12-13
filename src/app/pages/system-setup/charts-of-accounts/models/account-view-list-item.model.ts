export interface AccountViewListItem {
    id: string;
    number: string;
    postingDate: string;
    accountNumber: string;
    accountName: string;
    debit: number;
    credit: number;
    balance: number;
    items?: AccountViewListItem[];
}