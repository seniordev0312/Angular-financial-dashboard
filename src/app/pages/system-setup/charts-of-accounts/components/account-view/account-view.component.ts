import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountViewComponent implements OnInit {
  startDateFormControl = new FormControl();
  endDateFormControl = new FormControl();
  chartOfAccountsLink = `/${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.ChartOfAccounts}`;
  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
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
