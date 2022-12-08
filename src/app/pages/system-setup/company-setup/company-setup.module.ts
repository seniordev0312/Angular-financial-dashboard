import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanySetupComponent } from './components/company-setup/company-setup.component';
import { SharedModule } from '@root/shared/shared.module';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { SharedSystemSetupModule } from '../shared-system-setup/shared-system-setup.module';

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
    SharedSystemSetupModule,
    RouterModule.forChild(routes)
  ]
})
export class CompanySetupModule { }
