import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceRenewalsComponent } from './components/insurance-renewals/insurance-renewals.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: InsuranceRenewalsComponent,
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
