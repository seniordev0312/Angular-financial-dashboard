import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

@Component({
  selector: 'app-general-accounting',
  templateUrl: './general-accounting.component.html',
  styleUrls: ['./general-accounting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralAccountingComponent implements OnInit {

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.GeneralAccounting,
          translationKey: 'accounting-add-finance.general-accounting.general-accounting'
        }
      ],
    });
  }

}
