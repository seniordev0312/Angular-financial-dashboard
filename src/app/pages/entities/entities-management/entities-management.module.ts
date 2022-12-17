import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesManagementComponent } from './components/entities-management/entities-management.component';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@root/shared/shared.module';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { SecurityGuard } from '@root/shared/guards/security.guard';
import { Permission } from '@root/shared/models/enums/permissions.enum';

const routes: Routes = [
  {
    path: ApplicationRoutes.Empty,
    component: EntitiesManagementComponent,
    data: {
      permission: Permission.CanAccessEntityManagement
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
  }
];

@NgModule({
  declarations: [
    EntitiesManagementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
})
export class EntitiesManagementModule { }
