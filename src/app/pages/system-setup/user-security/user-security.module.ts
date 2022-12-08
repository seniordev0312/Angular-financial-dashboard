import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { UserRolesManagementComponent } from './components/user-roles-management/user-roles-management.component';
import { UserPoliciesComponent } from './components/user-policies/user-policies.component';
import { AddRoleComponent } from './components/add-role/add-role.component';
import { SharedSystemSetupModule } from '../shared-system-setup/shared-system-setup.module';

import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { SharedModule } from '@root/shared/shared.module';
import { UserSecurityComponent } from './components/user-security/user-security.component';
import { AddUserRoleComponent } from './components/add-user-role/add-user-role.component';
const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: UserSecurityComponent
  },
  {
    path: ApplicationRoutes.Add,
    component: AddRoleComponent,
    outlet: 'sidenav',
  },
  {
    path: `${ApplicationRoutes.Add}/:id`,
    component: AddRoleComponent,
    outlet: 'sidenav',
  },
];

@NgModule({
  declarations: [
    UserSecurityComponent,
    UserRolesManagementComponent,
    UserPoliciesComponent,
    AddRoleComponent,
    AddUserRoleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TableModule,
    SharedSystemSetupModule,
    RouterModule.forChild(routes)
  ]
})
export class UserSecurityModule { }
