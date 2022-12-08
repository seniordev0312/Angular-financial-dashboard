import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyStructureComponent } from './components/company-structure/company-structure.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { SharedModule } from '@root/shared/shared.module';
import { SharedSystemSetupModule } from '../shared-system-setup/shared-system-setup.module';

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
    SharedSystemSetupModule,
    RouterModule.forChild(routes)
  ]
})
export class CompanyStructureModule { }
