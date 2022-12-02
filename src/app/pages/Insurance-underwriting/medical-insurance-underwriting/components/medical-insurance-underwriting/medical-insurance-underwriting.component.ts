import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

@Component({
  selector: 'app-medical-insurance-underwriting',
  templateUrl: './medical-insurance-underwriting.component.html',
  styleUrls: ['./medical-insurance-underwriting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalInsuranceUnderwritingComponent implements OnInit {

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.MedicalInsuranceUnderwriting,
          translationKey: 'medical-insurance-underwriting.medical-insurance-underwriting'
        }
      ],
    });
  }

}
