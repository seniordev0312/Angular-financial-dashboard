import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LifeInsuranceUnderwritingComponent } from './components/life-insurance-underwriting/life-insurance-underwriting.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { SecurityGuard } from '@root/shared/guards/security.guard';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: LifeInsuranceUnderwritingComponent,
    data: {
      permission: Permission.CanAccessLifeInsuranceUnderwriting
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
  }
];

@NgModule({
  declarations: [
    LifeInsuranceUnderwritingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class LifeInsuranceUnderwritingModule { }
