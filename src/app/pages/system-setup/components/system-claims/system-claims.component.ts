import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

@Component({
  selector: 'app-system-claims',
  templateUrl: './system-claims.component.html',
  styleUrls: ['./system-claims.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemClaimsComponent implements OnInit {

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.SystemSetup,
          translationKey: 'system-setup.system-setup.system-setup'
        },
        {
          route: 'system-claims',
          translationKey: 'system-setup.system-setup.system-claims'
        }
      ],
    });
  }
}
