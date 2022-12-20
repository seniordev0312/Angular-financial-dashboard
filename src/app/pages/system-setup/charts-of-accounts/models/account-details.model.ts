export interface AccountDetails {
    accountId?: string;
    accountTypeId?: string;
    companyName: string;
    isNewGroup: boolean;
    parentAccountTypeId: string;
    code: string;
    name: string;
    currencyId: number;
    accountType: number;
}