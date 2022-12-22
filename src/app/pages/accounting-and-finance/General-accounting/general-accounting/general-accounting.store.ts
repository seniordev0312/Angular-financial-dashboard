import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import {
    persistState,
    sessionStorageStrategy,
} from '@ngneat/elf-persist-state';
import { JournalTotalsModel } from './model/journal-totals.model';
import { JournalModel } from './model/journal.model';


export interface GeneralAccountingModel {
    JournalList: JournalModel[];
    JournalTotal: JournalTotalsModel;
    EinValue: string,
}

const store = createStore(
    {
        name: 'General Accounting',
    },
    withProps<GeneralAccountingModel>({
        JournalList: [],
        JournalTotal: null,
        EinValue: '',
    })
);

persistState(store, {
    storage: sessionStorageStrategy,
});

export const JournalList$ = store.pipe(select(({ JournalList }) => JournalList));

export const JournalTotal$ = store.pipe(select(({ JournalTotal }) => JournalTotal));

export const EinValue$ = store.pipe(select(({ EinValue }) => EinValue));




export type GeneralAccountingStore = typeof store;
export const GENERAL_ACCOUNTING_STORE = new InjectionToken<
    ReturnType<typeof createStore>
>('Injection Token For General Accounting', {
    providedIn: 'root',
    factory: (): GeneralAccountingStore => store,
});
