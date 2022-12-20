export interface ChartOfAccountsListItem {
    accountId: string;
    accountTypeId: string;
    parentAccountTypeId: string;
    accountNo: string;
    decription: string;
    type: string;
    toIncrease: string;
    currency: string;
    debit: number;
    credit: number;
    balance: number;
    activeFlag: boolean;
    lastLevelFlag: boolean;
    childrenCount?: number;
    children?: ChartOfAccountsListItem[];
}