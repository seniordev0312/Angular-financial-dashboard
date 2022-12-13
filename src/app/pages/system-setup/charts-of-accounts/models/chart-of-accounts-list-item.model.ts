export interface ChartOfAccountsListItem {
    id: string;
    ledgerNumber: string;
    description: string;
    type: string;
    isCredit: string;
    currency: string;
    balance: number;
    items: ChartOfAccountsListItem[];
}