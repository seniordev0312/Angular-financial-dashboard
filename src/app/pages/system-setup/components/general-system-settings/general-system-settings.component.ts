import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

@Component({
  selector: 'app-general-system-settings',
  templateUrl: './general-system-settings.component.html',
  styleUrls: ['./general-system-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralSystemSettingsComponent implements OnInit {
  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.SystemSetup,
          translationKey: 'system-setup.system-setup.system-setup'
        },
        {
          route: ApplicationRoutes.GeneralSystemSettings,
          translationKey: 'system-setup.system-setup.general-system-settings'
        }
      ],
    });
  }
}

