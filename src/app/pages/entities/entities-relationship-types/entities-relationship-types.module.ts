import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesRelationshipTypesManagementComponent } from './components/entities-relationship-types-management/entities-relationship-types-management.component';
import { SharedModule } from '@root/shared/shared.module';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { Route, RouterModule } from '@angular/router';
import { AddRelationshipTypeComponent } from './components/add-relationship-type/add-relationship-type.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: EntitiesRelationshipTypesManagementComponent,
    canActivate: [AutoLoginAllRoutesGuard]
  },
  {
    path: ApplicationRoutes.Add,
    component: AddRelationshipTypeComponent,
    outlet: 'sidenav',
    canActivate: [AutoLoginAllRoutesGuard]
  },
];

@NgModule({
  declarations: [
    EntitiesRelationshipTypesManagementComponent,
    AddRelationshipTypeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSlideToggleModule,
    RouterModule.forChild(routes)
  ]
})
export class EntitiesRelationshipTypesModule { }
