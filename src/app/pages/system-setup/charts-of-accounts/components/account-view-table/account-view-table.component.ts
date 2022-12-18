import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AccountViewListItem } from '../../models/account-view-list-item.model';

@Component({
  selector: 'app-account-view-table',
  templateUrl: './account-view-table.component.html',
  styleUrls: ['./account-view-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountViewTableComponent implements OnInit {

  pageSize = 2;
  rolesList: AccountViewListItem[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
