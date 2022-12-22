import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import dayjs from 'dayjs';
import { AccountBalance } from '../../models/account-balance.model';
import { JournalList } from '../../models/journal-list.model';
import { accountViewClosingDate$, accountViewOpeningDate$, journalList$ } from '../../store/chart-of-accounts.store';

@Component({
  selector: 'app-account-view-table',
  templateUrl: './account-view-table.component.html',
  styleUrls: ['./account-view-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountViewTableComponent extends BaseComponent implements OnInit {
  @Output() triggerPageIndexChange = new EventEmitter<number>()
  @Input() openingDate: Date;
  @Input() closingDate: Date;
  @Input() pageSize: number;

  accountViewOpeningDate: AccountBalance;
  accountViewClosingDate: AccountBalance;

  data: JournalList;
  constructor(private cdr: ChangeDetectorRef) { super(); }

  ngOnInit(): void {
    this.subscriptions.add(accountViewOpeningDate$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.accountViewOpeningDate = data;
      }
    }));

    this.subscriptions.add(accountViewClosingDate$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.accountViewClosingDate = data;
      }
    }));
    
    this.subscriptions.add(journalList$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.data = data;
        this.cdr.detectChanges();
      }
    }));
  }

  get formattedOpeningDate() {
    return dayjs(this.openingDate).format('MMMM DD,YYYY');
  }

  get formattedClosingDate() {
    return dayjs(this.closingDate).format('MMMM DD,YYYY');
  }
}
