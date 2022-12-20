import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { environment } from 'src/environments/environment';
import { UserSecurityService } from '../../services/user-security.service';

@Component({
  selector: 'app-user-security',
  templateUrl: './user-security.component.html',
  styleUrls: ['./user-security.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSecurityComponent implements OnInit {

  constructor(
    private layoutService: LayoutService,
    private userSecurityService: UserSecurityService,
  ) {
    this.userSecurityService.getClaims(`${environment.identityAPIServerURL}/Clients/3/ClaimGroups`)
  }


  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.SystemSetup,
          translationKey: 'system-setup.system-setup.system-setup'
        },
        {
          route: ApplicationRoutes.UserSecurity,
          translationKey: 'system-setup.system-setup.user-security'
        }
      ],
    });
  }

}