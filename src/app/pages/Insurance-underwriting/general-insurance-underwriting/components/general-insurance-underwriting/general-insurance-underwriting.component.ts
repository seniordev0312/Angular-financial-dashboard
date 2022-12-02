import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

@Component({
  selector: 'app-general-insurance-underwriting',
  templateUrl: './general-insurance-underwriting.component.html',
  styleUrls: ['./general-insurance-underwriting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralInsuranceUnderwritingComponent implements OnInit {

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.GeneralInsuranceUnderwriting,
          translationKey: 'general-insurance-underwriting.general-insurance-underwriting'
        }
      ],
    });
  }

}
