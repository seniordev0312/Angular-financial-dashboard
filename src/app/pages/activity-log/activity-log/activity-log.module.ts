import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityLogComponent } from './components/activity-log/activity-log.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: ActivityLogComponent,
    canActivate: [AutoLoginAllRoutesGuard]
  }
];

@NgModule({
  declarations: [
    ActivityLogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ActivityLogModule { }
