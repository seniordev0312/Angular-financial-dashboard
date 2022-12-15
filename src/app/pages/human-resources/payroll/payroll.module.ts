import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayrollComponent } from './components/payroll/payroll.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';


const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: PayrollComponent,
    canActivate: [AutoLoginAllRoutesGuard]
  }
];
@NgModule({
  declarations: [
    PayrollComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PayrollModule { }
