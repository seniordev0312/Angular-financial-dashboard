import { Injectable, Inject } from '@angular/core';
import { ChartOfAccountsListItem } from '../models/chart-of-accounts-list-item.model';
import { ChartOfAccountsStore, CHART_OF_ACCOUNTS_LIST_STORE } from './chart-of-accounts.store';

@Injectable({
    providedIn: 'root',
})
export class ChartOfAccountsRepository {
    constructor(
        @Inject(CHART_OF_ACCOUNTS_LIST_STORE) private chartOfAccountsStore: ChartOfAccountsStore,
    ) { }


    updateChartOfAccountsList(chartOfAccountsList: ChartOfAccountsListItem[]): void {
        this.chartOfAccountsStore.update((state) => ({
            ...state,
            chartOfAccountsList: chartOfAccountsList
        }));
    }

}
