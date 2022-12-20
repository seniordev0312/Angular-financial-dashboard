import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Route, RouterModule } from '@angular/router';
import { SecurityGuard } from '@root/shared/guards/security.guard';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { SharedModule } from '@root/shared/shared.module';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { TableModule } from 'primeng/table';

import { SharedSystemSetupModule } from '../shared-system-setup/shared-system-setup.module';
import { AddUserRoleComponent } from './components/add-user-role/add-user-role.component';
import { UserPoliciesComponent } from './components/user-policies/user-policies.component';
import { UserRolesManagementComponent } from './components/user-roles-management/user-roles-management.component';
import { UserSecurityComponent } from './components/user-security/user-security.component';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: UserSecurityComponent,
    data: {
      permission: Permission.CanAccessUserSecurity
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
  },
  {
    path: ApplicationRoutes.Add,
    component: AddUserRoleComponent,
    outlet: 'sidenav',
    data: {
      permission: Permission.CanAddRole
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
  },
  {
    path: `${ApplicationRoutes.Add}/:id/:name`,
    component: AddUserRoleComponent,
    outlet: 'sidenav',
    data: {
      permission: Permission.CanEditRole
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
  },
];

@NgModule({
  declarations: [
    UserSecurityComponent,
    UserRolesManagementComponent,
    UserPoliciesComponent,
    AddUserRoleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TableModule,
    MatChipsModule,
    MatSlideToggleModule,
    SharedSystemSetupModule,
    RouterModule.forChild(routes)
  ]
})
export class UserSecurityModule { }
