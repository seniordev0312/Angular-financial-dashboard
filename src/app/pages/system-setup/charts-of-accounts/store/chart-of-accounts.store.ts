import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { ChartOfAccountsListItem } from '../models/chart-of-accounts-list-item.model';

export interface ChartOfAccountsModel {
    chartOfAccountsList: ChartOfAccountsListItem[];
}

const store = createStore(
    {
        name: 'Chart Of Accounts List',
    },
    withProps<ChartOfAccountsModel>({
        chartOfAccountsList: [],
    })
);


export const chartOfAccountsList$ = store.pipe(select(({ chartOfAccountsList }) => chartOfAccountsList));


export type ChartOfAccountsStore = typeof store;
export const CHART_OF_ACCOUNTS_LIST_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For Chart Of Accounts List Store', {
    providedIn: 'root',
    factory: (): ChartOfAccountsStore => store,
});
