import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesMappingManagementComponent } from './components/entities-mapping-management/entities-mapping-management.component';
import { SharedModule } from '@root/shared/shared.module';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AddNewMappingComponent } from './components/add-new-mapping/add-new-mapping.component';


const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: EntitiesMappingManagementComponent
  },
  {
    path: ApplicationRoutes.Add,
    component: AddNewMappingComponent,
    outlet: 'sidenav',
  },
  {
    path: `${ApplicationRoutes.Add}/:id`,
    component: AddNewMappingComponent,
    outlet: 'sidenav',
  }
];

@NgModule({
  declarations: [
    EntitiesMappingManagementComponent,
    AddNewMappingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class EntitiesMappingManagementModule { }
