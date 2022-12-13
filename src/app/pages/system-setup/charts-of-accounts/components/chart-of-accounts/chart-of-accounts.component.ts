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
      id: '1',
      currency: 'USD',
      description: 'Account jkdk dnmn dnmnmd ndm mndm mndsm mdnm mnmnm n mndnmmn',
      ledgerNumber: '10-000-26733',
      balance: 1000000000000,
      isCredit: 'Credit',
      type: 'Assets',
      items: [
        {
          id: '2',
          currency: 'USD',
          description: 'Account jkdk dnmn dnmnmd ndm mndm mndsm mdnm mnmnm n mndnmmn',
          ledgerNumber: '10-000-2387783',
          balance: 1000000000000,
          isCredit: 'Credit',
          type: 'Assets',
          items: [
            {
              id: '39',
              currency: 'iii',
              description: 'Account jkdk dnmn dnmnmd ndm mndm mndsm mdnm mnmnm n mndnmmn',
              ledgerNumber: '10-000-2233',
              balance: 1000000000000,
              isCredit: 'Credit',
              type: 'Assets',
              items: []
            },
            {
              id: '88',
              currency: 'klkl',
              description: 'Account jkdk dnmn dnmnmd ndm mndm mndsm mdnm mnmnm n mndnmmn',
              ledgerNumber: '10-000-243',
              balance: 1000000000000,
              isCredit: 'Credit',
              type: 'Assets',
              items: []
            },
          ]
        },
        {
          id: '3',
          currency: 'USD',
          description: 'Account jkdk dnmn dnmnmd ndm mndm mndsm mdnm mnmnm n mndnmmn',
          ledgerNumber: '10-000-2363',
          balance: 1000000000000,
          isCredit: 'Credit',
          type: 'Assets',
          items: []
        }
      ]
    },
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

  onChartOfAccountAdded(showParentInput: boolean) {
    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.ChartOfAccounts}`, {
      outlets: { sidenav: `${ApplicationRoutes.Add}` },
    }], { skipLocationChange: true, queryParams: { isLeafItem: showParentInput } });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

  onChartOfAccountEdited(item: ChartOfAccountsListItem, isLeafItem: boolean) {
    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.ChartOfAccounts}`, {
      outlets: { sidenav: `${ApplicationRoutes.Add}/${item.id}` },
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
