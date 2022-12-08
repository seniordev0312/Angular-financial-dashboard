import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { SharedModule } from '@root/shared/shared.module';
import { UserSecurityComponent } from './components/user-security/user-security.component';
import { AddUserRoleComponent } from './components/add-user-role/add-user-role.component';
const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: UserSecurityComponent
  }
]
@NgModule({
  declarations: [
    UserSecurityComponent,
    AddUserRoleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSlideToggleModule,
    RouterModule.forChild(routes)
  ]
})
export class UserSecurityModule { }
