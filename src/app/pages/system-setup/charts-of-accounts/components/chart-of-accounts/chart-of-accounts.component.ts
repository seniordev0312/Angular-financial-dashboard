import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { ConfirmationDialogService } from '@root/shared/notifications/services/dialog-confirmation.service';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { debounceTime, take } from 'rxjs';
import { AccountDetails } from '../../models/account-details.model';
import { ChartOfAccountsListItem } from '../../models/chart-of-accounts-list-item.model';
import { ChartOfAccountsListService } from '../../services/chart-of-accounts-list.service';
import { ChartOfAccountsRepository } from '../../store/chart-of-accounts.repository';
import { chartOfAccountsList$ } from '../../store/chart-of-accounts.store';

@Component({
  selector: 'app-chart-of-accounts',
  templateUrl: './chart-of-accounts.component.html',
  styleUrls: ['./chart-of-accounts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartOfAccountsComponent extends BaseComponent implements OnInit {
  searchFormControl = new FormControl();
  viewAccountLink = ApplicationRoutes.ViewAccount;
  pageSize = 10;
  pageIndex = 0;
  itemsCount = 0;
  chartOfAccountsList: ChartOfAccountsListItem[] = [];

  constructor(private layoutService: LayoutService,
    private confirmationDialogService: ConfirmationDialogService,
    private chartOfAccountsRepository: ChartOfAccountsRepository,
    private chartOfAccountsListService: ChartOfAccountsListService,
    private cdr: ChangeDetectorRef,
    private router: Router) { super(); }


  ngOnInit(): void {
    // this.chartOfAccountsListService.getChartOfAccountsList(this.pageIndex, this.pageSize, null);
    this.chartOfAccountsListService.getChartOfAccountsList(this.pageIndex, this.pageSize);

    this.subscriptions.add(chartOfAccountsList$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.chartOfAccountsList = data.paginatedAccounts;
        this.itemsCount = data.accountsCount;
        this.cdr.detectChanges();
      }
    }));

    this.subscriptions.add(
      this.searchFormControl.valueChanges.pipe(debounceTime(1000)).subscribe(data => {
        if (!this.isEmpty(data)) {
          this.pageIndex = 0;
          this.chartOfAccountsListService.getChartOfAccountsList(this.pageIndex, this.pageSize, data);
        }
      })
    );

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


  onChartOfAccountAdded(isLeafItem: boolean, parentAccountTypeId: string = null, canChangeParent = false) {
    this.chartOfAccountsRepository.updateAccountDetails({} as AccountDetails);
    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.ChartOfAccounts}`, {
      outlets: { sidenav: `${ApplicationRoutes.Add}/${!isLeafItem}` },
    }], { skipLocationChange: true, queryParams: { parentAccountTypeId, canChangeParent } });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

  onChartOfAccountEdited(item: ChartOfAccountsListItem) {
    this.chartOfAccountsRepository.updateAccountDetails({} as AccountDetails);
    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.ChartOfAccounts}`, {
      outlets: { sidenav: `${ApplicationRoutes.Add}/${item.accountTypeId ?? item.accountId}/${item.accountTypeId !== null}` },
    }], { skipLocationChange: true });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

  onChartOfAccountDeactivated(item: ChartOfAccountsListItem, isActive: boolean) {
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
        if (isConfirmed) {
          this.chartOfAccountsListService.changeChartOfAccountStatus(item.accountId ?? item.accountTypeId, item.lastLevelFlag, isActive);
        }
      }));
  }

  showViewButton(item: ChartOfAccountsListItem): boolean {
    let showViewButton = true;
    item.children?.forEach((item) => {
      if (item.childrenCount && item.childrenCount > 0) {
        showViewButton = false;
      }
    })
    return showViewButton;
  }

  showAddButton(item: ChartOfAccountsListItem) {
    return item.accountTypeId;
  }

  onLazyLoad(data: any) {
    if ((data.first / data.rows) !== this.pageIndex && data.rows !== 0) {
      this.pageIndex = data.first / data.rows;
      this.chartOfAccountsListService.getChartOfAccountsList(this.pageIndex, this.pageSize);
    }
  }
}
