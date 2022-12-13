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
  rolesList: AccountViewListItem[] = [
    {
      id: '22',
      number: 'Opening Balance',
      accountName: '',
      accountNumber: '10-130-01',
      balance: 450000000,
      credit: null,
      debit: null,
      postingDate: 'September 22, 2022',
      items: [
        {
          id: '21',
          number: '1',
          accountName: 'Loans',
          accountNumber: '10-130-01',
          balance: 300000000,
          credit: 100,
          debit: 7500000,
          postingDate: '08/23/2022',
        },
        {
          id: '2',
          number: '1',
          accountName: 'Loans',
          accountNumber: '10-130-01',
          balance: 300000000,
          credit: 100,
          debit: 7500000,
          postingDate: '08/23/2022',
        },
        {
          id: '290',
          number: '1',
          accountName: 'Loans',
          accountNumber: '10-130-01',
          balance: 300000000,
          credit: 100,
          debit: 7500000,
          postingDate: '08/23/2022',
        }
      ]
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
