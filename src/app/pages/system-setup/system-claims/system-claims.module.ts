import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { SharedModule } from '@root/shared/shared.module';

import { SystemClaimsComponent } from './components/system-claims.component';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: SystemClaimsComponent
  }
]

@NgModule({
  declarations: [
    SystemClaimsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SystemClaimsModule { }
