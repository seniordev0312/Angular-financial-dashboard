import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
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
  accountViewOpeningDate: AccountBalance;
  accountViewClosingDate: AccountBalance;

  pageSize = 2;
  data: JournalList;
  constructor() { super(); }

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
      }
    }))
  }

}
