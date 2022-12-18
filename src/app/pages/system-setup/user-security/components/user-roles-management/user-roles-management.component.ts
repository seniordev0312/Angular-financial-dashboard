import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { ConfirmationDialogService } from '@root/shared/notifications/services/dialog-confirmation.service';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { take } from 'rxjs';

import { RoleList } from '../../models/role-list.model';
import { Role } from '../../models/role.model';
import { UserSecurityService } from '../../services/user-security.service';
import { roleList$ } from '../../store/user-security.store';

@Component({
  selector: 'app-user-roles-management',
  templateUrl: './user-roles-management.component.html',
  styleUrls: ['./user-roles-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserRolesManagementComponent extends BaseComponent implements OnInit {
  canAddRolePermission = Permission.CanAddRole;
  canEditRolePermission = Permission.CanEditRole;
  data: RoleList;
  pageIndex: number = 0;
  pageSize: number = 100;

  constructor(
    private userSecurityService: UserSecurityService,
    private layoutService: LayoutService,
    private confirmationDialogService: ConfirmationDialogService,
    private cdr: ChangeDetectorRef,
    private router: Router) { super(); }

  ngOnInit(): void {
    this.subscriptions.add(
      this.userSecurityService.deleteRole$.subscribe((data) => {
        if (data) {
          this.userSecurityService.getRoles(this.pageIndex, this.pageSize);
        }
      })
    )
    this.subscriptions.add(
      roleList$.subscribe((data) => {
        console.log(data);
        this.data = data;
        this.cdr.detectChanges();
      })
    );
    this.subscriptions.add(
      this.userSecurityService.addRole$.subscribe((_data) => {
        this.userSecurityService.getRoles(this.pageIndex, this.pageSize);
      })
    );
    this.userSecurityService.getRoles(this.pageIndex, this.pageSize);
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.SystemSetup,
          translationKey: 'system-setup.system-setup'
        },
        {
          route: ApplicationRoutes.UserSecurity,
          translationKey: 'system-setup.user-security'
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

  onRoleEdited(userRolesListItem: any) {
    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.UserSecurity}`, {
      outlets: {
        sidenav: `${ApplicationRoutes.Add}/${userRolesListItem.id}/${userRolesListItem.name}`
      },
    }], {
      skipLocationChange: true,
      queryParams: {
        id: userRolesListItem.id,
        name: userRolesListItem.name,
      }
    },
    );

    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

  onRoleDeleted(userRolesListItem: any) {
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
        if (isConfirmed) {
          this.userSecurityService.deleteRole(userRolesListItem.id)
        }
      }));
  }

  getRoleClaims(role: Role) {
    this.userSecurityService.getClaimsByRole(role);
  }

  removeClaimFromRole(claim: any) {
    this.userSecurityService.deleteClaimFromRole({ claimId: claim.claimId, roleId: claim.roleId })
  }
}
