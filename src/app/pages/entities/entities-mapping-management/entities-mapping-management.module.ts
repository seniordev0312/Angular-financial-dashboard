import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesMappingManagementComponent } from './components/entities-mapping-management/entities-mapping-management.component';
import { SharedModule } from '@root/shared/shared.module';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AddNewMappingComponent } from './components/add-new-mapping/add-new-mapping.component';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { SecurityGuard } from '@root/shared/guards/security.guard';


const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    redirectTo: ':id',
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: EntitiesMappingManagementComponent,
    data: {
      permission: Permission.CanAccessEntityMapping
    },
    canActivate: [
      SecurityGuard
    ]
  },
  {
    path: `${ApplicationRoutes.Add}`,
    component: AddNewMappingComponent,
    outlet: 'sidenav',
    data: {
      permission: Permission.CanAddEntityMapping
    },
    canActivate: [
      SecurityGuard
    ]
  },
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
