import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayrollComponent } from './components/payroll/payroll.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { SecurityGuard } from '@root/shared/guards/security.guard';
import { SharedModule } from '@root/shared/shared.module';


const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: PayrollComponent,
    data: {
      permission: Permission.CanAccessPayroll
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
  }
];
@NgModule({
  declarations: [
    PayrollComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class PayrollModule { }
