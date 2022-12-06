import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesListManagementComponent } from './components/entities-list-management/entities-list-management.component';
import { AddNewEntityComponent } from './components/add-new-entity/add-new-entity.component';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '@root/shared/shared.module';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: EntitiesListManagementComponent
  },
  {
    path: ApplicationRoutes.Add,
    component: AddNewEntityComponent,
    outlet: 'sidenav',
  },
  {
    path: `${ApplicationRoutes.Add}/:id`,
    component: AddNewEntityComponent,
    outlet: 'sidenav',
  }
];

@NgModule({
  declarations: [
    EntitiesListManagementComponent,
    AddNewEntityComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class EntitiesListManagementModule { }
