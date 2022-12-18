import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ChartOfAccountsRepository } from '../store/chart-of-accounts.repository';
import { ChartOfAccountsListItem } from '../models/chart-of-accounts-list-item.model';


@Injectable({ providedIn: 'root' })
export class ChartOfAccountsListService {

    constructor(private httpClient: HttpClient,
        private chartOfAccountsRepository: ChartOfAccountsRepository) { }

    getChartOfAccountsList(pageSize: number, childrenPageSize: number): void {
        const endPointUrl = `${environment.systemSetupApiUrl}/Account/GetAccountsHierarchy/${pageSize}/${childrenPageSize}`;
        this.httpClient.get<ChartOfAccountsListItem[]>(endPointUrl).subscribe(data => {
            if (data) {
                this.chartOfAccountsRepository.updateChartOfAccountsList(data);
            }
        });
    }

    searchChartOfAccountsList(searchWord: string): void {
        const endPointUrl = `${environment.systemSetupApiUrl}/Account/SearchAccount/${searchWord}`;
        this.httpClient.get<ChartOfAccountsListItem[]>(endPointUrl).subscribe(data => {
            if (data) {
                this.chartOfAccountsRepository.updateChartOfAccountsList(data);
            }
        });
    }
}
