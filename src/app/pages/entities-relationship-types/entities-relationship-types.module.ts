import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesRelationshipTypesManagementComponent } from './components/entities-relationship-types-management/entities-relationship-types-management.component';
import { SharedModule } from '@root/shared/shared.module';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: EntitiesRelationshipTypesManagementComponent
  },
];

@NgModule({
  declarations: [
    EntitiesRelationshipTypesManagementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class EntitiesRelationshipTypesModule { }
