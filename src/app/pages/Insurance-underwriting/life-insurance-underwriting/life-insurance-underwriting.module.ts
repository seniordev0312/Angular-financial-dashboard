import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LifeInsuranceUnderwritingComponent } from './components/life-insurance-underwriting/life-insurance-underwriting.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: LifeInsuranceUnderwritingComponent,
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
