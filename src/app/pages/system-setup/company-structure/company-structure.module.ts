import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { SharedModule } from 'primeng/api';

import { CompanyStructureComponent } from './components/company-structure.component';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: CompanyStructureComponent
  }
]

@NgModule({
  declarations: [
    CompanyStructureComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSlideToggleModule,
    RouterModule.forChild(routes)
  ]
})
export class CompanyStructureModule { }
