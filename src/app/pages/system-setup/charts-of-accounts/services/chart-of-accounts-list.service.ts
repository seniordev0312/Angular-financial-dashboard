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

    getChartOfAccountsList(pageIndex: number, pageSize: number, searchWord?: string): void {
        let endPointUrl = `${environment.systemSetupApiUrl}/Account/GetAccountsHierarchy/${pageIndex}/${pageSize}`;
        if (searchWord) {
            endPointUrl = `${environment.systemSetupApiUrl}/Account/SearchAccountsHierarchy/${searchWord}/${pageIndex}/${pageSize}`;
        }
        this.httpClient.get<ChartOfAccountsList>(endPointUrl).subscribe(data => {
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
                this.chartOfAccountsRepository.updateAccountDetails(data);
            }
        });
    }

    addAccountType(account: AddAccount) {
        const endPointUrl = `${environment.systemSetupApiUrl}/AccountType/AddAccountType`;
        this.httpClient.post<AccountDetails>(endPointUrl, account).subscribe(data => {
            if (data) {
                this.chartOfAccountsRepository.updateAccountDetails(data);
            }
        });
    }

    updateAccount(account: AddAccount) {
        const endPointUrl = `${environment.systemSetupApiUrl}/Account/UpdateAccount`;
        this.httpClient.post<AccountDetails>(endPointUrl, account).subscribe(data => {
            if (data) {
                this.chartOfAccountsRepository.updateAccountDetails(data);
            }
        });
    }

    addAccount(account: AddAccount) {
        const endPointUrl = `${environment.systemSetupApiUrl}/Account/AddAccount`;
        this.httpClient.post<AccountDetails>(endPointUrl, account).subscribe(data => {
            if (data) {
                this.chartOfAccountsRepository.updateAccountDetails(data);
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

    getAccountJournalList(accountId: string, pageIndex: number, pageSize: number, lastLevelFlag: boolean, bookId: number): void {
        const endPointUrl = `${environment.systemSetupApiUrl}/JournalItem/GetEntriesByAccountOrAccountType/${accountId}/${pageIndex}/${pageSize}/${lastLevelFlag}/${bookId}`;
        this.httpClient.get<JournalList>(endPointUrl).subscribe(data => {
            if (data) {
                this.chartOfAccountsRepository.updateJournalList(data);
            }
        });
    }
}
