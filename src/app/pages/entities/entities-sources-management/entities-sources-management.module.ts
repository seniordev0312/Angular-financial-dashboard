import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesSourcesManagementComponent } from './components/entities-sources-management/entities-sources-management.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { SharedModule } from '@root/shared/shared.module';
import { AddEntitySourceComponent } from './components/add-entity-source/add-entity-source.component';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: EntitiesSourcesManagementComponent,
    canActivate: [AutoLoginAllRoutesGuard]
  },
  {
    path: ApplicationRoutes.Add,
    component: AddEntitySourceComponent,
    outlet: 'sidenav',
    canActivate: [AutoLoginAllRoutesGuard]
  },
  {
    path: `${ApplicationRoutes.Add}/:id`,
    component: AddEntitySourceComponent,
    outlet: 'sidenav',
    canActivate: [AutoLoginAllRoutesGuard]
  }
];

@NgModule({
  declarations: [
    EntitiesSourcesManagementComponent,
    AddEntitySourceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class EntitiesSourcesManagementModule { }
