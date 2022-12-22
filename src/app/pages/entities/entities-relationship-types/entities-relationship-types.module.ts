import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesRelationshipTypesManagementComponent } from './components/entities-relationship-types-management/entities-relationship-types-management.component';
import { SharedModule } from '@root/shared/shared.module';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { Route, RouterModule } from '@angular/router';
import { AddRelationshipTypeComponent } from './components/add-relationship-type/add-relationship-type.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { SecurityGuard } from '@root/shared/guards/security.guard';
import { MatChipsModule } from '@angular/material/chips';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: EntitiesRelationshipTypesManagementComponent,
    data: {
      permission: Permission.CanAccessEntityRelationshipType
    },
    canActivate: [
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
      SecurityGuard
    ]
  },
  {
    path: `${ApplicationRoutes.Add}/:id`,
    component: AddRelationshipTypeComponent,
    outlet: 'sidenav',
    data: {
      permission: Permission.CanEditEntityRelationshipType
    },
    canActivate: [
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
    MatChipsModule,
    RouterModule.forChild(routes)
  ]
})
export class EntitiesRelationshipTypesModule { }
