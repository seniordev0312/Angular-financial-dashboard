import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import {
  GeneralInsuranceUnderwritingComponent,
} from './components/general-insurance-underwriting/general-insurance-underwriting.component';


const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: GeneralInsuranceUnderwritingComponent,
    canActivate: [AutoLoginAllRoutesGuard]
  }
];
@NgModule({
  declarations: [
    GeneralInsuranceUnderwritingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GeneralInsuranceUnderwritingModule { }
