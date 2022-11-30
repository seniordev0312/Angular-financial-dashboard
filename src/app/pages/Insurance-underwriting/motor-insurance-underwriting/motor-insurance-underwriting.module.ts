import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotorInsuranceUnderwritingComponent } from './components/motor-insurance-underwriting/motor-insurance-underwriting.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';


const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: MotorInsuranceUnderwritingComponent,
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
