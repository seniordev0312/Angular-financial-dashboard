import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { AccountBalance } from '../models/account-balance.model';
import { AccountDetails } from '../models/account-details.model';
import { ChartOfAccountsList } from '../models/chart-of-accounts-list.model';
import { Currency } from '../models/currency.model';
import { JournalList } from '../models/journal-list.model';

export interface ChartOfAccountsModel {
    chartOfAccountsList: ChartOfAccountsList;
    currenciesList: Currency[];
    accountDetails: AccountDetails;
    accountViewOpeningDate: AccountBalance;
    accountViewClosingDate: AccountBalance;
    journalList: JournalList;
}

const store = createStore(
    {
        name: 'Chart Of Accounts List',
    },
    withProps<ChartOfAccountsModel>({
        chartOfAccountsList: {} as ChartOfAccountsList,
        currenciesList: [],
        accountDetails: {} as AccountDetails,
        accountViewClosingDate: {} as AccountBalance,
        accountViewOpeningDate: {} as AccountBalance,
        journalList: {} as JournalList
    })
);


export const chartOfAccountsList$ = store.pipe(select(({ chartOfAccountsList }) => chartOfAccountsList));
export const currenciesList$ = store.pipe(select(({ currenciesList }) => currenciesList));
export const accountDetails$ = store.pipe(select(({ accountDetails }) => accountDetails));
export const accountViewOpeningDate$ = store.pipe(select(({ accountViewOpeningDate }) => accountViewOpeningDate));
export const accountViewClosingDate$ = store.pipe(select(({ accountViewClosingDate }) => accountViewClosingDate));
export const journalList$ = store.pipe(select(({ journalList }) => journalList));


export type ChartOfAccountsStore = typeof store;
export const CHART_OF_ACCOUNTS_LIST_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For Chart Of Accounts List Store', {
    providedIn: 'root',
    factory: (): ChartOfAccountsStore => store,
});
