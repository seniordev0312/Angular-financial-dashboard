import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesSourcesManagementComponent } from './components/entities-sources-management/entities-sources-management.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { SharedModule } from '@root/shared/shared.module';
import { AddEntitySourceComponent } from './components/add-entity-source/add-entity-source.component';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: EntitiesSourcesManagementComponent
  },
  {
    path: ApplicationRoutes.Add,
    component: AddEntitySourceComponent,
    outlet: 'sidenav',
  },
  {
    path: `${ApplicationRoutes.Add}/:id`,
    component: AddEntitySourceComponent,
    outlet: 'sidenav',
  }
]

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
