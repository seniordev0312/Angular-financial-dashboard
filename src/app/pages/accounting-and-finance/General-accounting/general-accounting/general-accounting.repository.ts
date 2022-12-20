import { Inject, Injectable } from '@angular/core';
import { GeneralAccountingStore, GENERAL_ACCOUNTING_STORE } from './general-accounting.store';
import { JournalTotalsModel } from './model/journal-totals.model';
import { JournalModel } from './model/journal.model';

@Injectable({
    providedIn: 'root',
})
export class GeneralAccountingRepository {
    constructor(
        @Inject(GENERAL_ACCOUNTING_STORE) private generalAccountingStore: GeneralAccountingStore,
    ) { }

    get values() {
        return this.generalAccountingStore.value;
    }

    updateJournalItems(data: JournalModel[]) {
        this.generalAccountingStore.update((state) => ({
            ...state,
            JournalList: data
        }));
    }

    updateJournalTotal(data: JournalTotalsModel) {
        this.generalAccountingStore.update((state) => ({
            ...state,
            JournalTotal: data
        }));
    }

}
