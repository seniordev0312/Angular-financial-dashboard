import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ChartOfAccountsRepository } from '../store/chart-of-accounts.repository';
import { ChartOfAccountsListItem } from '../models/chart-of-accounts-list-item.model';
import { Currency } from '../models/currency.model';
import { AccountDetails } from '../models/account-details.model';
import { AddAccount } from '../models/add-account.model';
import { AccountBalance } from '../models/account-balance.model';
import { ChartOfAccountsList } from '../models/chart-of-accounts-list.model';
import { JournalList } from '../models/journal-list.model';

@Injectable({ providedIn: 'root' })
export class ChartOfAccountsListService {

    constructor(private httpClient: HttpClient,
        private chartOfAccountsRepository: ChartOfAccountsRepository) { }

    getChartOfAccountsList(pageIndex: number, pageSize: number, searchWord?: string, isBackground = false): void {
        let httpOptions = {
        };
        if (isBackground) {
            httpOptions = {
                ...httpOptions,
                headers: new HttpHeaders({
                    'process': 'background',
                })
            }
        }
        let endPointUrl = `${environment.systemSetupApiUrl}/Account/GetAccountsHierarchy/${pageIndex}/${pageSize}`;
        if (searchWord) {
            endPointUrl = `${environment.systemSetupApiUrl}/Account/SearchAccountsHierarchy/${searchWord}/${pageIndex}/${pageSize}`;
        }
        this.httpClient.get<ChartOfAccountsList>(endPointUrl, httpOptions).subscribe(data => {
            if (data) {
                this.chartOfAccountsRepository.updateChartOfAccountsList(data);
            }
        });
    }


    getCurrenciesList(): void {
        const httpOptions = {
            headers: new HttpHeaders({
                'InterceptorHideSpinner': '',
            }),
        };
        const endPointUrl = `${environment.systemSetupApiUrl}/Currency/GetCurrencies`;
        this.httpClient.get<Currency[]>(endPointUrl, httpOptions).subscribe(data => {
            if (data) {
                this.chartOfAccountsRepository.updateCurrenciesList(data);
            }
        });
    }

    getAccountDetails(accountId: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'InterceptorShowSidenavSpinner': '',
            }),
        };
        const endPointUrl = `${environment.systemSetupApiUrl}/Account/GetAccount/${accountId}`;
        this.httpClient.get<AccountDetails>(endPointUrl, httpOptions).subscribe(data => {
            if (data) {
                this.chartOfAccountsRepository.updateAccountDetails(data);
            }
        });
    }

    getAccountTypeDetails(accountId: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'InterceptorShowSidenavSpinner': '',
            }),
        };
        const endPointUrl = `${environment.systemSetupApiUrl}/AccountType/GetAccountType/${accountId}`;
        this.httpClient.get<AccountDetails>(endPointUrl, httpOptions).subscribe(data => {
            if (data) {
                this.chartOfAccountsRepository.updateAccountDetails(data);
            }
        });
    }

    updateAccountType(account: AddAccount) {
        const endPointUrl = `${environment.systemSetupApiUrl}/AccountType/UpdateAccountType`;
        this.httpClient.post<AccountDetails>(endPointUrl, account).subscribe(data => {
            if (data) {
                this.getChartOfAccountsList(0, 10, null, true);
            }
        });
    }

    addAccountType(account: AddAccount) {
        const endPointUrl = `${environment.systemSetupApiUrl}/AccountType/AddAccountType`;
        this.httpClient.post<AccountDetails>(endPointUrl, account).subscribe(data => {
            if (data) {
                this.getChartOfAccountsList(0, 10, null, true);
            }
        });
    }

    updateAccount(account: AddAccount) {
        const endPointUrl = `${environment.systemSetupApiUrl}/Account/UpdateAccount`;
        this.httpClient.post<AccountDetails>(endPointUrl, account).subscribe(data => {
            if (data) {
                this.getChartOfAccountsList(0, 10, null, true);
            }
        });
    }

    addAccount(account: AddAccount) {
        const endPointUrl = `${environment.systemSetupApiUrl}/Account/AddAccount`;
        this.httpClient.post<AccountDetails>(endPointUrl, account).subscribe(data => {
            if (data) {
                this.getChartOfAccountsList(0, 10, null, true);
            }
        });
    }


    changeChartOfAccountStatus(accountTypeIdOrAccountId: string, lastLevelFlag: boolean, activeFlag: boolean): void {
        const endPointUrl = `${environment.systemSetupApiUrl}/Account/ChangeAccountStatus/${accountTypeIdOrAccountId}/${lastLevelFlag}/${activeFlag}`;
        this.httpClient.put<ChartOfAccountsListItem[]>(endPointUrl, null).subscribe(data => {
            if (data) {
                this.chartOfAccountsRepository.changeChartOfAccountStatus(accountTypeIdOrAccountId, activeFlag);
            }
        });
    }

    getAccountViewOpeningBalance(accountId: string, date: string, bookId: number): void {
        const endPointUrl = `${environment.systemSetupApiUrl}/Account/GetAccountBalance/${accountId}/${date}/${bookId}`;
        this.httpClient.get<AccountBalance>(endPointUrl).subscribe(data => {
            if (data) {
                this.chartOfAccountsRepository.updateAccountViewOpeningDate(data);
            }
        });
    }

    getAccountViewClosingBalance(accountId: string, date: string, bookId: number): void {
        const endPointUrl = `${environment.systemSetupApiUrl}/Account/GetAccountBalance/${accountId}/${date}/${bookId}`;
        this.httpClient.get<AccountBalance>(endPointUrl).subscribe(data => {
            if (data) {
                this.chartOfAccountsRepository.updateAccountViewClosingDate(data);
            }
        });
    }

    getAccountJournalList(accountId: string, pageIndex: number, pageSize: number, lastLevelFlag: boolean,
        fromDate: string, toDate: string,
        bookId: number): void {
        const endPointUrl = `${environment.systemSetupApiUrl}/JournalItem/GetEntriesByAccountOrAccountType/${accountId}/${pageIndex}/${pageSize}/${lastLevelFlag}/${fromDate}/${toDate}/${bookId}`;
        this.httpClient.get<JournalList>(endPointUrl).subscribe(data => {
            if (data) {
                this.chartOfAccountsRepository.updateJournalList(data);
            }
        });
    }

    getAccountTypesList(search: string): void {
        const httpOptions = {
            headers: new HttpHeaders({
                'process': 'background',
            }),
        };
        const endPointUrl = `${environment.systemSetupApiUrl}/AccountType/SearchAccountType/${search}`;
        this.httpClient.get<any[]>(endPointUrl, httpOptions).subscribe(data => {
            if (data) {
                this.chartOfAccountsRepository.updateAccountTypesList(data.map(e => ({ id: e.accountTypeId, value: e.name })));
            }
        });
    }
}
