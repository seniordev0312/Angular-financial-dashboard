import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import dayjs from 'dayjs';
import { ChartOfAccountsListService } from '../../services/chart-of-accounts-list.service';
import { journalList$ } from '../../store/chart-of-accounts.store';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountViewComponent extends BaseComponent implements OnInit {
  startDateFormControl = new FormControl(new Date());
  endDateFormControl = new FormControl(new Date('12/30/2022'));
  chartOfAccountsLink = `/${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.ChartOfAccounts}`;
  pageIndex = 0;
  pageSize = 20;
  dataCount: number;
  accountTypeId: string;
  lastLevelFlag: boolean;
  name: string;
  parentName: string;
  constructor(private layoutService: LayoutService,
    private chartOfAccountsListService: ChartOfAccountsListService,
    private activeRoute: ActivatedRoute
  ) { super(); }

  ngOnInit(): void {
    this.subscriptions.add(this.activeRoute.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.accountTypeId = params.get('id');
        const date = dayjs(this.startDateFormControl.value).format('YYYY-MM-DD');
        this.chartOfAccountsListService.getAccountViewOpeningBalance(params.get('id'), date, 0);
        this.chartOfAccountsListService.getAccountViewClosingBalance(params.get('id'), date, 0);
      }
    }));

    this.subscriptions.add(this.activeRoute.queryParams.subscribe(params => {
      if (params.lastLevelFlag) {
        this.lastLevelFlag = params.lastLevelFlag === 'true';
        const startDate = dayjs(this.startDateFormControl.value).format('YYYY-MM-DD');
        const endDate = dayjs(this.endDateFormControl.value).format('YYYY-MM-DD');
        this.chartOfAccountsListService.getAccountJournalList(this.accountTypeId, this.pageIndex,
          this.pageSize, this.lastLevelFlag, startDate, endDate, 0);
      }
      if (params.name) {
        this.name = params.name;
      }
      if (params.parentName) {
        this.parentName = params.parentName;
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

    this.subscriptions.add(this.startDateFormControl.valueChanges.subscribe(() => {
      const startDate = dayjs(this.startDateFormControl.value).format('YYYY-MM-DD');
      const endDate = dayjs(this.endDateFormControl.value).format('YYYY-MM-DD');
      this.chartOfAccountsListService.getAccountJournalList(this.accountTypeId, this.pageIndex,
        this.pageSize, this.lastLevelFlag, startDate, endDate, 0);
    }));

    this.subscriptions.add(this.endDateFormControl.valueChanges.subscribe(() => {
      const startDate = dayjs(this.startDateFormControl.value).format('YYYY-MM-DD');
      const endDate = dayjs(this.endDateFormControl.value).format('YYYY-MM-DD');
      this.chartOfAccountsListService.getAccountJournalList(this.accountTypeId, this.pageIndex,
        this.pageSize, this.lastLevelFlag, startDate, endDate, 0);
    }));

    this.subscriptions.add(journalList$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.dataCount = data.journalItemsCount;
      }
    }));
  }

  onPageSizeChanged(data: MatButtonToggleChange) {
    if (data.value === null) {
      this.pageIndex = 0;
      this.pageSize = this.dataCount;
    }
    else {
      this.pageSize = data.value;
    }
    const startDate = dayjs(this.startDateFormControl.value).format('YYYY-MM-DD');
    const endDate = dayjs(this.endDateFormControl.value).format('YYYY-MM-DD');
    this.chartOfAccountsListService.getAccountJournalList(this.accountTypeId, this.pageIndex,
      this.pageSize, this.lastLevelFlag, startDate, endDate, 0);
  }

  onPageIndexChanged(pageIndex: number) {
    this.pageIndex = pageIndex;
    const startDate = dayjs(this.startDateFormControl.value).format('YYYY-MM-DD');
    const endDate = dayjs(this.endDateFormControl.value).format('YYYY-MM-DD');
    this.chartOfAccountsListService.getAccountJournalList(this.accountTypeId, this.pageIndex,
      this.pageSize, this.lastLevelFlag, startDate, endDate, 0);
  }
}
