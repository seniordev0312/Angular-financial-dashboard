import { Injectable, Inject } from '@angular/core';
import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { AccountBalance } from '../models/account-balance.model';
import { AccountDetails } from '../models/account-details.model';
import { ChartOfAccountsListItem } from '../models/chart-of-accounts-list-item.model';
import { ChartOfAccountsList } from '../models/chart-of-accounts-list.model';
import { Currency } from '../models/currency.model';
import { JournalList } from '../models/journal-list.model';
import { ChartOfAccountsStore, CHART_OF_ACCOUNTS_LIST_STORE } from './chart-of-accounts.store';

@Injectable({
    providedIn: 'root',
})
export class ChartOfAccountsRepository {
    constructor(
        @Inject(CHART_OF_ACCOUNTS_LIST_STORE) private chartOfAccountsStore: ChartOfAccountsStore,
    ) { }


    updateChartOfAccountsList(chartOfAccountsList: ChartOfAccountsList): void {
        this.chartOfAccountsStore.update((state) => ({
            ...state,
            chartOfAccountsList: chartOfAccountsList
        }));
    }

    updateJournalList(journalList: JournalList): void {
        this.chartOfAccountsStore.update((state) => ({
            ...state,
            journalList
        }));
    }

    updateAccountTypesList(accountTypes: BaseListItem[]): void {
        this.chartOfAccountsStore.update((state) => ({
            ...state,
            accountTypes
        }));
    }

    updateCurrenciesList(currenciesList: Currency[]): void {
        this.chartOfAccountsStore.update((state) => ({
            ...state,
            currenciesList: currenciesList
        }));
    }

    updateAccountViewOpeningDate(accountViewOpeningDate: AccountBalance): void {
        this.chartOfAccountsStore.update((state) => ({
            ...state,
            accountViewOpeningDate
        }));
    }

    updateAccountViewClosingDate(accountViewClosingDate: AccountBalance): void {
        this.chartOfAccountsStore.update((state) => ({
            ...state,
            accountViewClosingDate
        }));
    }

    updateAccountDetails(accountDetails: AccountDetails): void {
        this.chartOfAccountsStore.update((state) => ({
            ...state,
            accountDetails
        }));
    }

    changeChartOfAccountStatus(id: string, isActive: boolean): void {
        this.chartOfAccountsStore.update((state) => ({
            ...state,
            chartOfAccountsList: {
                accountsCount: this.chartOfAccountsStore.value.chartOfAccountsList.accountsCount,
                paginatedAccounts: this.getUpdatedChartOfAccountsList(id, isActive)
            }
        }));
    }


    getUpdatedChartOfAccountsList(id: string, isActive: boolean): ChartOfAccountsListItem[] {
        const newList = [...this.chartOfAccountsStore.value.chartOfAccountsList.paginatedAccounts];
        const index = newList.findIndex((e) => e.accountId === id || e.accountTypeId === id);
        if (index !== -1) {
            newList[index] = { ...newList[index], activeFlag: isActive };
        }

        return newList;
    }
}
