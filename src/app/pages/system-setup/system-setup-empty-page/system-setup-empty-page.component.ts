import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

@Component({
  templateUrl: './system-setup-empty-page.component.html',
  styleUrls: ['./system-setup-empty-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemSetupEmptyPageComponent implements OnInit {

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [{
        route: ApplicationRoutes.SystemSetup,
        translationKey: 'system-setup.system-setup'
      }]
    });
  }

}
