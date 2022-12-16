import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { ConfirmationDialogService } from '@root/shared/notifications/services/dialog-confirmation.service';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { take } from 'rxjs';
import { ChartOfAccountsListItem } from '../../models/chart-of-accounts-list-item.model';

@Component({
  selector: 'app-chart-of-accounts',
  templateUrl: './chart-of-accounts.component.html',
  styleUrls: ['./chart-of-accounts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartOfAccountsComponent extends BaseComponent implements OnInit {
  searchFormControl = new FormControl();
  viewAccountLink = ApplicationRoutes.ViewAccount;
  pageSize = 20;
  chartOfAccountsList: ChartOfAccountsListItem[] = [
    {
      "accountId": null,
      "accountTypeId": 1,
      "accountNo": "10000008",
      "decription": "CAPITAL",
      "type": "Capital",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false,

    },
    {
      "accountId": null,
      "accountTypeId": 5,
      "accountNo": "11000007",
      "decription": "RESERVES",
      "type": "Capital",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 8,
      "accountNo": "12000006",
      "decription": "BROUGHT FORWARD RESULTS",
      "type": "Capital",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 9,
      "accountNo": "13000005",
      "decription": "NET PERIOD RESULTS",
      "type": "Capital",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 12,
      "accountNo": "15000003",
      "decription": "PROVISIONS",
      "type": "Capital",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 15,
      "accountNo": "18000000",
      "decription": "BRANCHES ACCOUNT",
      "type": "Capital",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 17,
      "accountNo": "19000009",
      "decription": "CHARGES & INCOME ACCOUNTS (ACCUMULATION)",
      "type": "Capital",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 20,
      "accountNo": "21000005",
      "decription": "TECHNICAL INVESTMENTS",
      "type": "Asset",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 31,
      "accountNo": "22000004",
      "decription": "NON TECHNICAL INVESTMENTS",
      "type": "Asset",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 48,
      "accountNo": "23000003",
      "decription": "OTHER FIXED ASSETS",
      "type": "Asset",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 56,
      "accountNo": "28000008",
      "decription": "FIXED ASSETS DEPRECIATION",
      "type": "Asset",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 63,
      "accountNo": "29000007",
      "decription": "VALUATION OF FIXED ASSETS",
      "type": "Asset",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 66,
      "accountNo": "31000003",
      "decription": "TECHNICAL RESERVES -LIFE",
      "type": "Liability",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 74,
      "accountNo": "32000002",
      "decription": "TECHNICAL RESERVES -NON LIFE",
      "type": "Liability",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 87,
      "accountNo": "34000000",
      "decription": "TECHNICAL RESERVE ACCEPTED BUSINESS LIFE",
      "type": "Liability",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 92,
      "accountNo": "35000009",
      "decription": "TECHNICAL RESERVES ACCEPTED BUSINESS NON LIFE",
      "type": "Liability",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 95,
      "accountNo": "39000005",
      "decription": "REINSURERS SHARE IN TECHNICAL RESERVES",
      "type": "Liability",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 110,
      "accountNo": "40000002",
      "decription": "ACCOUNTS RECEIVABLE & PAYABLE",
      "type": "VatSupplier",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 118,
      "accountNo": "41000001",
      "decription": "DIRECT INSURERS - BROKERS & AGENTS",
      "type": "VatSupplier",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 140,
      "accountNo": "42000000",
      "decription": "EMPLOYEES ACCOUNTS",
      "type": "VatSupplier",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 145,
      "accountNo": "43000009",
      "decription": "CNSS ACCOUNTS",
      "type": "VatSupplier",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 149,
      "accountNo": "44000008",
      "decription": "GOVERNMENT & PUBLIC INSTITUTIONS",
      "type": "VatSupplier",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 168,
      "accountNo": "45000007",
      "decription": "PARTNERS ACCOUNTS",
      "type": "VatSupplier",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 179,
      "accountNo": "46000006",
      "decription": "MISCELLANOUS CREDITORS",
      "type": "VatSupplier",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 214,
      "accountNo": "47000005",
      "decription": "REGULARIZATION ACCOUNTS",
      "type": "VatSupplier",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 225,
      "accountNo": "48000004",
      "decription": "TRANSITORY & RECONCILIATION ACCOUNTS",
      "type": "VatSupplier",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 233,
      "accountNo": "49000003",
      "decription": "PROVISIONS FOR DECREASE IN ACCOUNTS REC./PAY.",
      "type": "VatSupplier",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 238,
      "accountNo": "50000009",
      "decription": "FINANCIAL ACCOUNTS",
      "type": "BankAndCash",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 244,
      "accountNo": "51000008",
      "decription": "BANKS & FINANCIAL INSTITUTIONS",
      "type": "BankAndCash",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 287,
      "accountNo": "53000006",
      "decription": "CASH",
      "type": "BankAndCash",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 329,
      "accountNo": "59000000",
      "decription": "Unrealized Gain/Loss on Financial Investment",
      "type": "BankAndCash",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 335,
      "accountNo": "60000007",
      "decription": "CHARGES",
      "type": "Expense",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 379,
      "accountNo": "61000006",
      "decription": "PURCHASE OF CONSUMABLES",
      "type": "Expense",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 389,
      "accountNo": "62000005",
      "decription": "EXTERNAL EXPENSES",
      "type": "Expense",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 412,
      "accountNo": "63000004",
      "decription": "EMPLOYEES EXPENSES",
      "type": "Expense",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 424,
      "accountNo": "64000003",
      "decription": "TAXES - FEES & OTHER EXPENSES",
      "type": "Expense",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 432,
      "accountNo": "65000002",
      "decription": "DEPRECIATION/AMORTISATION",
      "type": "Expense",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 439,
      "accountNo": "66000001",
      "decription": "OTHER INVESTMENT EXPENSES",
      "type": "Expense",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 444,
      "accountNo": "67000000",
      "decription": "FINANCIAL CHARGES",
      "type": "Expense",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 460,
      "accountNo": "68000009",
      "decription": "NON OPERATING CHARGES",
      "type": "Expense",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 467,
      "accountNo": "69000008",
      "decription": "INCOME TAX ON PROFIT",
      "type": "Expense",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 468,
      "accountNo": "71000004",
      "decription": "PREMIUMS",
      "type": "Revenue",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 509,
      "accountNo": "72000003",
      "decription": "COMM.& PARTICIPATING REVENUES FROM REINS.",
      "type": "Revenue",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 524,
      "accountNo": "76000009",
      "decription": "OTHER OPERATING INCOME",
      "type": "Revenue",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 528,
      "accountNo": "77000008",
      "decription": "FINANCIAL REVENUES",
      "type": "Revenue",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 538,
      "accountNo": "78000007",
      "decription": "NON OPERATING INCOME",
      "type": "Revenue",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 541,
      "accountNo": "79000006",
      "decription": "CHANGE IN TECHNICAL RESERVES",
      "type": "Revenue",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 556,
      "accountNo": "81000002",
      "decription": "RECEIVED GUARANTEES",
      "type": "OffBalance",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 558,
      "accountNo": "82000001",
      "decription": "GUARANTEES GRANTED",
      "type": "OffBalance",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 560,
      "accountNo": "85000008",
      "decription": "DEPOSIT",
      "type": "OffBalance",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    },
    {
      "accountId": null,
      "accountTypeId": 561,
      "accountNo": "87000006",
      "decription": "GUARANTEES ISSUED",
      "type": "OffBalance",
      "toIncrease": "Debit",
      "currency": "LBP",
      "debit": "",
      "credit": "",
      "balance": "",
      "lastLevelFlag": false
    }
  ];

  constructor(private layoutService: LayoutService,
    private confirmationDialogService: ConfirmationDialogService,
    private router: Router) { super(); }

  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.SystemSetup,
          translationKey: 'system-setup.system-setup'
        },
        {
          route: ApplicationRoutes.ChartOfAccounts,
          translationKey: 'system-setup.chart-of-accounts.chart-of-accounts'
        }
      ],
    });
  }
  items(accountId: number, accountTypeId: number) {
    const item = this.chartOfAccountsList.find((item: ChartOfAccountsListItem) => item.accountId === accountId && item.accountTypeId === accountTypeId)
    return item;
  }

  onChartOfAccountAdded(showParentInput: boolean) {
    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.ChartOfAccounts}`, {
      outlets: { sidenav: `${ApplicationRoutes.Add}` },
    }], { skipLocationChange: true, queryParams: { isLeafItem: showParentInput } });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

  onChartOfAccountEdited(item: ChartOfAccountsListItem, isLeafItem: boolean) {
    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.ChartOfAccounts}`, {
      outlets: { sidenav: `${ApplicationRoutes.Add}/${item.accountTypeId}` },
    }], { skipLocationChange: true, queryParams: { isLeafItem } });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

  onChartOfAccountDeactivated(_item: ChartOfAccountsListItem) {
    this.confirmationDialogService.open({
      description: 'Are you sure you want to deactivate this chart of account?',
      title: 'Deactivate Chart Of Account',
      icon: 'error_outline',
      cancelText: 'Cancel',
      confirmText: 'Confirm',
      actionButtonsColor: 'warn',
      iconCssClasses: 'text-warn',
    });

    this.subscriptions.add(
      this.confirmationDialogService.confirmed().pipe(take(1)).subscribe((isConfirmed) => {
        if (isConfirmed) { }
      }));
  }
}
