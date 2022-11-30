import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreatyManagementComponent } from './components/treaty-management/treaty-management.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: TreatyManagementComponent,
  }
];


@NgModule({
  declarations: [
    TreatyManagementComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class TreatyManagementModule { }
