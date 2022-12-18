import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { ConfirmationDialogService } from '@root/shared/notifications/services/dialog-confirmation.service';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { debounceTime, take } from 'rxjs';
import { ChartOfAccountsListItem } from '../../models/chart-of-accounts-list-item.model';
import { ChartOfAccountsListService } from '../../services/chart-of-accounts-list.service';
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
  childrenPageSize = 10;

  chartOfAccountsList: ChartOfAccountsListItem[] = [];

  constructor(private layoutService: LayoutService,
    private confirmationDialogService: ConfirmationDialogService,
    private chartOfAccountsListService: ChartOfAccountsListService,
    private cdr: ChangeDetectorRef,
    private router: Router) { super(); }


  ngOnInit(): void {
    this.chartOfAccountsListService.getChartOfAccountsList(this.pageSize, this.childrenPageSize);

    this.subscriptions.add(chartOfAccountsList$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.chartOfAccountsList = data;
        this.cdr.detectChanges();
      }
    }));

    this.subscriptions.add(
      this.searchFormControl.valueChanges.pipe(debounceTime(400)).subscribe(data => {
        if (!this.isEmpty(data)) {
          this.chartOfAccountsListService.searchChartOfAccountsList(data);
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
