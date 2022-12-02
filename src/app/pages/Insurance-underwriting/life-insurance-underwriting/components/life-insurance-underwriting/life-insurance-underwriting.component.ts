import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

@Component({
  selector: 'app-life-insurance-underwriting',
  templateUrl: './life-insurance-underwriting.component.html',
  styleUrls: ['./life-insurance-underwriting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LifeInsuranceUnderwritingComponent implements OnInit {

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.LifeInsuranceUnderwriting,
          translationKey: 'life-insurance-underwriting.life-insurance-underwriting'
        }
      ],
    });
  }

}
