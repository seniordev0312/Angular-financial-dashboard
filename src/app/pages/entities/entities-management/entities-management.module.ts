import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesManagementComponent } from './components/entities-management/entities-management.component';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@root/shared/shared.module';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';

const routes: Routes = [
  {
    path: ApplicationRoutes.Empty,
    component: EntitiesManagementComponent,
    canActivate: [AutoLoginAllRoutesGuard]
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
  ]
})
export class EntitiesManagementModule { }
