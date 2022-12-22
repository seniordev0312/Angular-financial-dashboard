import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralAccountingRepository } from './general-accounting.repository';
import { JournalModel } from './model/journal.model';
import { JournalTotalsModel } from './model/journal-totals.model';
import { CurrencyRateModel } from './model/currency-rate.model';
import { JournalEntryModel } from './model/journal-entry.model';

@Injectable({ providedIn: 'root' })
export class GeneralAccountingService {
    /// TEST ONE
    private baseUrl = 'https://dev.api.accounting.aperatureuk.com/v1/';

    constructor(private httpClient: HttpClient,
        private generalAccountingRepository: GeneralAccountingRepository) { }

    getJournalItems(startData: string, endData: string): void {
        const url = this.baseUrl + 'JournalItem/GetJournalItems/' + startData + '/' + endData + '/0/100';
        this.httpClient.get<JournalModel[]>(url).subscribe(data => {
            this.generalAccountingRepository.updateJournalItems(data);
        });
    }
    getJournalItemTotals(startData: string, endData: string): void {
        const url = this.baseUrl + 'JournalItem/GetJournalItemTotals/' + startData + '/' + endData;
        this.httpClient.get<JournalTotalsModel>(url).subscribe(data => {
            this.generalAccountingRepository.updateJournalTotal(data);
        });
    }
    addJournalEntryWithDetails(item: JournalEntryModel) {
        console.log("DATA", item)
        const url = this.baseUrl + 'JournalEntry/UpdateJournalEntry';
        console.log("DATA", this.baseUrl)
        const header = {
            headers: new HttpHeaders(
                {
                })
        };
        return this.httpClient.post(url, item, header);
    }
    searchAccounts(query: string) {
        const url = this.baseUrl + 'Account/SearchAccount/';
        const header = {
            headers: new HttpHeaders(
                {
                })
        };
        return this.httpClient.get(url + query, header);
    }
    getJournalItemsByAccount(id: number, startData: string, endData: string) {
        const url = this.baseUrl + 'JournalItem/GetJournalItemsByAccount/' + id + '/' + startData + '/' + endData + '/0/100';
        const header = {
            headers: new HttpHeaders(
                {
                })
        };
        return this.httpClient.get(url, header);
    }


    getAccountOpenBalance(id: number, date: string,) {
        const url = this.baseUrl + 'Account/GetAccountBalance/' + id + '/' + date + '/1';
        console.log(url)
        const header = {
            headers: new HttpHeaders(
                {
                })
        };
        return this.httpClient.get(url, header);

    }

    getCurrencyRates(id: number, startData: string, endData: string) {
        const url = this.baseUrl + 'CurrencyRate/GetCurrencyRatesByCurrencyId/' + id + '/' + startData + '/' + endData + '/0/100';
        const header = {
            headers: new HttpHeaders(
                {
                })
        };
        return this.httpClient.get(url, header);
    }


    getCurrencyLastRates() {
        const url = this.baseUrl + 'CurrencyRate/GetCurrenciesLastRates';
        const header = {
            headers: new HttpHeaders(
                {
                })
        };
        return this.httpClient.get(url, header);
    }

    addCurrencyRate(newValue: number, currencyRateModel: CurrencyRateModel) {
        const url = this.baseUrl + 'CurrencyRate/AddCurrencyRate';
        const data = {
            "currencyRateId": currencyRateModel.currencyRateId,
            "currencyId": currencyRateModel.currencyId,
            "rate": newValue
        };
        const header = {
            headers: new HttpHeaders(
                {
                })
        };
        return this.httpClient.post(url, data, header);

    }

    getJournalsByEntryType(id: number) {
        const url = this.baseUrl + 'Journal/GetJournalsByEntryType/' + id;
        const header = {
            headers: new HttpHeaders(
                {
                })
        };
        return this.httpClient.get(url, header);
    }

    getCurrencies() {
        const url = this.baseUrl + 'Currency/GetCurrencies';
        const header = {
            headers: new HttpHeaders(
                {
                })
        };
        return this.httpClient.get(url, header);
    }

    getProductTaxByProductEin(ein: number) {
        console.log(ein);
        const url = this.baseUrl + 'ProductTax/GetProductTaxByProductEin/' + '01289122';
        const header = {
            headers: new HttpHeaders(
                {
                })
        };
        return this.httpClient.get(url, header);
    }


    getGeneralJournalEntryById(id: number) {
        const url = this.baseUrl + 'JournalEntry/GetJournalEntryById/' + id;
        const header = {
            headers: new HttpHeaders(
                {
                })
        };
        return this.httpClient.get(url, header);
    }

    getGuidByJournalEntry(id: number) {
        const url = this.baseUrl + 'Document/GetGuidByJournalEntry/' + id;
        const header = {
            headers: new HttpHeaders(
                {
                })
        };
        return this.httpClient.get(url, header);
    }

    getDocumentList(id: number) {
        const url = this.baseUrl + 'Document/GetDocumentList/' + id;
        const header = {
            headers: new HttpHeaders(
                {
                })
        };
        return this.httpClient.get(url, header);
    }


    downloadFile(id: number, name: string) {
        const url = this.baseUrl + 'Document/DownloadFile/' + id + '/' + name;
        const header = {
            headers: new HttpHeaders(
                {
                })
        };
        return this.httpClient.get(url, header);
    }

    getJournalEntryByGuid(guid: any) {
        const url = this.baseUrl + 'Document/GetJournalEntry/' + guid;
        const header = {
            headers: new HttpHeaders(
                {
                })
        };
        return this.httpClient.get(url, header);
    }
}

