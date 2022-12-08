import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanySetupComponent } from './components/company-setup.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

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
