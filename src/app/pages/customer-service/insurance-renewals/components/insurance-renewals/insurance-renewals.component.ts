import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

@Component({
  selector: 'app-insurance-renewals',
  templateUrl: './insurance-renewals.component.html',
  styleUrls: ['./insurance-renewals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsuranceRenewalsComponent implements OnInit {

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.InsuranceRenewals,
          translationKey: 'insurance-renewals.insurance-renewals'
        }
      ],
    });
  }

}
