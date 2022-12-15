import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorrespondenceManagementComponent } from './components/correspondence-management/correspondence-management.component';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { Route, RouterModule } from '@angular/router';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: CorrespondenceManagementComponent,
    canActivate: [AutoLoginAllRoutesGuard]
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
