import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { UserRolesListItem } from '../../models/user-roles-list-item.model';

@Component({
  selector: 'app-user-roles-management',
  templateUrl: './user-roles-management.component.html',
  styleUrls: ['./user-roles-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserRolesManagementComponent implements OnInit {

  rolesList: UserRolesListItem[] = [
    {
      id: '1',
      role: 'Accountting Header',
      description: 'Account jkdk dnmn dnmnmd ndm mndm mndsm mdnm mnmnm n mndnmmn',
      modules: [
        {
          id: '2',
          description: 'bnnn sbnnnnnnnnnn bnnnn nbbbbb nbsbn snms nmmnms mnnmnms',
          module: 'Entity Management',
          claims: 'Allow add entity'
        },
        {
          id: '7',
          description: 'bnnn sbnnnnnnnnnn bnnnn nbbbbb nbsbn snms nmmnms mnnmnms',
          module: 'Entity Management',
          claims: 'Allow add entity'
        }
      ]
    },
    {
      id: '2',
      role: 'Accountting Header',
      description: 'Account jkdk dnmn dnmnmd ndm mndm mndsm mdnm mnmnm n mndnmmn',
      modules: [
        {
          id: '3',
          description: 'bnnn sbnnnnnnnnnn bnnnn nbbbbb nbsbn snms nmmnms mnnmnms',
          module: 'Entity Management',
          claims: 'Allow add entity'
        },
        {
          id: '4',
          description: 'bnnn sbnnnnnnnnnn bnnnn nbbbbb nbsbn snms nmmnms mnnmnms',
          module: 'Entity Management',
          claims: 'Allow add entity'
        }
      ]
    },
  ];

  constructor(private layoutService: LayoutService,
    private router: Router) { }

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

  onRoleAdded() {
    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.UserSecurity}`, {
      outlets: {
        sidenav: ApplicationRoutes.AddUserRole
      },
    }], { skipLocationChange: true });

    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }
}
