import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalInsuranceUnderwritingComponent } from './components/medical-insurance-underwriting/medical-insurance-underwriting.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: MedicalInsuranceUnderwritingComponent,
    canActivate: [AutoLoginAllRoutesGuard]
  }
];


@NgModule({
  declarations: [
    MedicalInsuranceUnderwritingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class MedicalInsuranceUnderwritingModule { }
