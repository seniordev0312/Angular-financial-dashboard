export interface AddChartOfAccounts {
    id?: string;
    companyName: string;
    isNewGroup: boolean;
    parentAccount: string;
    ledgerNumber: string;
    description: string;
    defaultCurrency: number;
    accountType: number;
}