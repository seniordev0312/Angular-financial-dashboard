import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceRenewalsComponent } from './components/insurance-renewals/insurance-renewals.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: InsuranceRenewalsComponent,
    canActivate: [AutoLoginAllRoutesGuard]
  }
];

@NgModule({
  declarations: [
    InsuranceRenewalsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class InsuranceRenewalsModule { }
