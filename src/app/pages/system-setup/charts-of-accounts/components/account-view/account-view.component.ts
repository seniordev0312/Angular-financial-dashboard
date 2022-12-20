import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import dayjs from 'dayjs';
import { ChartOfAccountsListService } from '../../services/chart-of-accounts-list.service';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountViewComponent extends BaseComponent implements OnInit {
  startDateFormControl = new FormControl(new Date());
  endDateFormControl = new FormControl(new Date());
  chartOfAccountsLink = `/${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.ChartOfAccounts}`;
  pageIndex = 1;
  pageSize = 20;
  accountTypeId: string;
  lastLevelFlag: boolean;
  constructor(private layoutService: LayoutService,
    private chartOfAccountsListService: ChartOfAccountsListService,
    private activeRoute: ActivatedRoute
  ) { super(); }

  ngOnInit(): void {
    this.subscriptions.add(this.activeRoute.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.accountTypeId = params.get('id');
        this.lastLevelFlag = params.get('lastLevelFlag') === 'true';
        this.chartOfAccountsListService.getAccountJournalList(this.accountTypeId, this.pageIndex,
          this.pageSize, this.lastLevelFlag, 0);
        const date = dayjs(this.startDateFormControl.value).format('YYYY-MM-DD');
        this.chartOfAccountsListService.getAccountViewOpeningBalance(params.get('id'), date, 0);
        this.chartOfAccountsListService.getAccountViewClosingBalance(params.get('id'), date, 0);
      }
    }));
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.SystemSetup,
          translationKey: 'system-setup.system-setup'
        },
        {
          route: `${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.ChartOfAccounts}`,
          translationKey: 'system-setup.chart-of-accounts.chart-of-accounts'
        },
        {
          route: ApplicationRoutes.ViewAccount,
          translationKey: 'system-setup.chart-of-accounts.view-account'
        }
      ],
    });

  }

}
