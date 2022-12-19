import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorrespondenceManagementComponent } from './components/correspondence-management/correspondence-management.component';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { Route, RouterModule } from '@angular/router';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { SecurityGuard } from '@root/shared/guards/security.guard';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: CorrespondenceManagementComponent,
    data: {
      permission: Permission.CanAccessCorrespondenceManagement
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
  }
];


@NgModule({
  declarations: [
    CorrespondenceManagementComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CorrespondenceManagementModule { }
