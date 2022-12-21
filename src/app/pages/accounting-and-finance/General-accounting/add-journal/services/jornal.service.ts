import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class JournalService {
    journalEINSubject = new BehaviorSubject<string>(null);
    journalEIN$ = this.journalEINSubject.asObservable();

    updateJournalEIN(data: string): void {
        this.journalEINSubject.next(data);
    }
}