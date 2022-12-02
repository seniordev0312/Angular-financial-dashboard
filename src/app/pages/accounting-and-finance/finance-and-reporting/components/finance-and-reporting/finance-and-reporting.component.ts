import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

@Component({
  selector: 'app-finance-and-reporting',
  templateUrl: './finance-and-reporting.component.html',
  styleUrls: ['./finance-and-reporting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinanceAndReportingComponent implements OnInit {

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.FinanceAndReporting,
          translationKey: 'accounting-add-finance.finance-and-reporting.finance-and-reporting'
        }
      ],
    });
  }

}
