import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceAndReportingComponent } from './components/finance-and-reporting/finance-and-reporting.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { SecurityGuard } from '@root/shared/guards/security.guard';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: FinanceAndReportingComponent,
    data: {
      permission: Permission.CanAccessFinanceAndReporting
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
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
