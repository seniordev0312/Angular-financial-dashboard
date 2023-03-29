import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import {
    persistState,
    sessionStorageStrategy,
} from '@ngneat/elf-persist-state';

export interface FollowUpHistoryComponentModel {
    followUpHistoryList: any[];
    getFollowUpHistory: boolean;
}

const store = createStore(
    {
        name: 'follow-up-history-list-store',
    },
    withProps<FollowUpHistoryComponentModel>({
        followUpHistoryList: null,
        getFollowUpHistory: false
    })
);

persistState(store, {
    storage: sessionStorageStrategy,
});

export const followUpHistoryList$ = store.pipe(select(({ followUpHistoryList }) => followUpHistoryList));
export const getFollowUpHistory$ = store.pipe(select(({ getFollowUpHistory }) => getFollowUpHistory));
export type FollowUpHistoryStore = typeof store;
export const Follow_Up_History_Store = new InjectionToken<ReturnType<typeof createStore>>(
    'Injection Token For follow up history',
    {
        providedIn: 'root',
        factory: (): FollowUpHistoryStore => store,
    }
);
