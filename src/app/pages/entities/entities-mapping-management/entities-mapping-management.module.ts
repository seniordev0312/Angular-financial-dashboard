import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesMappingManagementComponent } from './components/entities-mapping-management/entities-mapping-management.component';
import { SharedModule } from '@root/shared/shared.module';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AddNewMappingComponent } from './components/add-new-mapping/add-new-mapping.component';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { SecurityGuard } from '@root/shared/guards/security.guard';


const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: EntitiesMappingManagementComponent,
    data: {
      permission: Permission.CanAccessEntityMapping
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
  },
  {
    path: ApplicationRoutes.Add,
    component: AddNewMappingComponent,
    outlet: 'sidenav',
    data: {
      permission: Permission.CanAddEntityMapping
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
  },
  {
    path: `${ApplicationRoutes.Add}/:id`,
    component: AddNewMappingComponent,
    outlet: 'sidenav',
    data: {
      permission: Permission.CanEditEntityMapping
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
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
