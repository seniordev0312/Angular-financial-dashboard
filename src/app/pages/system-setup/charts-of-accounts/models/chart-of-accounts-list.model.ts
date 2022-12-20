import { ChartOfAccountsListItem } from "./chart-of-accounts-list-item.model";

export interface ChartOfAccountsList {
    paginatedAccounts: ChartOfAccountsListItem[];
    accountsCount: number;
}