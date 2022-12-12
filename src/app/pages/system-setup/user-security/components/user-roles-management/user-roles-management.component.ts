import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { ConfirmationDialogService } from '@root/shared/notifications/services/dialog-confirmation.service';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { take } from 'rxjs';
import { UserRolesListItem } from '../../models/user-roles-list-item.model';

@Component({
  selector: 'app-user-roles-management',
  templateUrl: './user-roles-management.component.html',
  styleUrls: ['./user-roles-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserRolesManagementComponent extends BaseComponent implements OnInit {

  rolesList: UserRolesListItem[] = [
    {
      id: '1',
      name: 'Accounting Header',
      description: 'Account jkdk dnmn dnmnmd ndm mndm mndsm mdnm mnmnm n mndnmmn',
      claims: [
        {
          claimId: '2',
          roleId: 'bnnn sbnnnnnnnnnn bnnnn nbbbbb nbsbn snms nmmnms mnnmnms',
          claimType: 'Entity Management',
          claimValue: 'Allow add entity'
        },
        {
          claimId: '7',
          roleId: 'bnnn sbnnnnnnnnnn bnnnn nbbbbb nbsbn snms nmmnms mnnmnms',
          claimType: 'Entity Management',
          claimValue: 'Allow add entity'
        }
      ]
    },
    {
      id: '2',
      name: 'Accounting Header',
      description: 'Account jkdk dnmn dnmnmd ndm mndm mndsm mdnm mnmnm n mndnmmn',
      claims: [
        {
          claimId: '3',
          roleId: 'bnnn sbnnnnnnnnnn bnnnn nbbbbb nbsbn snms nmmnms mnnmnms',
          claimType: 'Entity Management',
          claimValue: 'Allow add entity'
        },
        {
          claimId: '4',
          roleId: 'bnnn sbnnnnnnnnnn bnnnn nbbbbb nbsbn snms nmmnms mnnmnms',
          claimType: 'Entity Management',
          claimValue: 'Allow add entity'
        }
      ]
    },
  ];

  constructor(private layoutService: LayoutService,
    private confirmationDialogService: ConfirmationDialogService,
    private router: Router) { super(); }

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
        sidenav: ApplicationRoutes.Add
      },
    }], { skipLocationChange: true });

    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

  onRoleEdited(userRolesListItem: UserRolesListItem) {
    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.UserSecurity}`, {
      outlets: {
        sidenav: `${ApplicationRoutes.Add}/${userRolesListItem.id}`
      },
    }], { skipLocationChange: true });

    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

  onRoleDeleted(_userRolesListItem: UserRolesListItem) {
    this.confirmationDialogService.open({
      description: 'Are you sure you want to delete this template?',
      title: 'Delete Template',
      icon: 'error_outline',
      cancelText: 'Cancel',
      confirmText: 'Confirm',
      actionButtonsColor: 'warn',
      iconCssClasses: 'text-warn',
    });

    this.subscriptions.add(
      this.confirmationDialogService.confirmed().pipe(take(1)).subscribe((isConfirmed) => {
        if (isConfirmed) { }
      }));
  }

}
