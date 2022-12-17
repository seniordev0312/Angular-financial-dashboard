import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotorInsuranceUnderwritingComponent } from './components/motor-insurance-underwriting/motor-insurance-underwriting.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { SecurityGuard } from '@root/shared/guards/security.guard';


const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: MotorInsuranceUnderwritingComponent,
    data: {
      permission: Permission.CanAccessMotorInsuranceUnderwriting
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
  }
];
@NgModule({
  declarations: [
    MotorInsuranceUnderwritingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MotorInsuranceUnderwritingModule { }
