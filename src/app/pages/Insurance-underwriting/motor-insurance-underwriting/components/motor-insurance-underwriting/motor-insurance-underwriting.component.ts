import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

@Component({
  selector: 'app-motor-insurance-underwriting',
  templateUrl: './motor-insurance-underwriting.component.html',
  styleUrls: ['./motor-insurance-underwriting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MotorInsuranceUnderwritingComponent implements OnInit {

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.MotorInsuranceUnderwriting,
          translationKey: 'motor-insurance-underwriting.motor-insurance-underwriting'
        }
      ],
    });
  }

}
