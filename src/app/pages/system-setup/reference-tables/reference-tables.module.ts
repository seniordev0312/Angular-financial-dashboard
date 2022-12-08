import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferenceTablesComponent } from './components/reference-tables/reference-tables.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { SharedModule } from '@root/shared/shared.module';
import { SharedSystemSetupModule } from '../shared-system-setup/shared-system-setup.module';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: ReferenceTablesComponent
  }
]

@NgModule({
  declarations: [ReferenceTablesComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedSystemSetupModule,
    RouterModule.forChild(routes)
  ]
})
export class ReferenceTablesModule { }
