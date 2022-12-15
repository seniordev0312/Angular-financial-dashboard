import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceAndReportingComponent } from './components/finance-and-reporting/finance-and-reporting.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: FinanceAndReportingComponent,
    canActivate: [AutoLoginAllRoutesGuard]
  }
];

@NgModule({
  declarations: [
    FinanceAndReportingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FinanceAndReportingModule { }
