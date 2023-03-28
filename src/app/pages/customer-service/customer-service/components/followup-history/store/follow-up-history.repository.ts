import { Inject, Injectable } from '@angular/core';
import { FollowUpHistoryStore, Follow_Up_History_Store } from './follow-up-history.store';
@Injectable({
    providedIn: 'root'
})
export class FollowUpHistoryRepository {

    constructor(
        @Inject(Follow_Up_History_Store) private followUpHistoryStore: FollowUpHistoryStore
    ) { }

    updateFollowUpHistoryList(followUpHistoryList: any) {
        this.followUpHistoryStore.update((state) => ({
            ...state,
            followUpHistoryList: followUpHistoryList
        }));
    }

    updateGetFollowUpHistory(getFollowUpHistory: any) {
        this.followUpHistoryStore.update((state) => ({
            ...state,
            getFollowUpHistory: getFollowUpHistory
        }));
    }
}