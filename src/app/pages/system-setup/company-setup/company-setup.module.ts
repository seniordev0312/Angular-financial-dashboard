import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanySetupComponent } from './components/company-setup.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { SharedModule } from '@root/shared/shared.module';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: CompanySetupComponent
  }
]

@NgModule({
  declarations: [
    CompanySetupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSlideToggleModule,
    RouterModule.forChild(routes)
  ]
})
export class CompanySetupModule { }
