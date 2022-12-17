import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesRelationshipTypesManagementComponent } from './components/entities-relationship-types-management/entities-relationship-types-management.component';
import { SharedModule } from '@root/shared/shared.module';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { Route, RouterModule } from '@angular/router';
import { AddRelationshipTypeComponent } from './components/add-relationship-type/add-relationship-type.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { SecurityGuard } from '@root/shared/guards/security.guard';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: EntitiesRelationshipTypesManagementComponent,
    data: {
      permission: Permission.CanAccessEntityRelationshipType
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
  },
  {
    path: ApplicationRoutes.Add,
    component: AddRelationshipTypeComponent,
    outlet: 'sidenav',
    data: {
      permission: Permission.CanAddEntityRelationshipType
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
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
