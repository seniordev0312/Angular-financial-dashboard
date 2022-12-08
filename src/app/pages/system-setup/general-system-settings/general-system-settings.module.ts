import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralSystemSettingsComponent } from './components/general-system-settings/general-system-settings.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { SharedModule } from '@root/shared/shared.module';
import { AddHolidayComponent } from './components/add-holiday/add-holiday.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedSystemSetupModule } from '../shared-system-setup/shared-system-setup.module';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: GeneralSystemSettingsComponent
  },
  {
    path: ApplicationRoutes.Add,
    component: AddHolidayComponent,
    outlet: 'sidenav',
  },
  {
    path: `${ApplicationRoutes.Add}/:id`,
    component: AddHolidayComponent,
    outlet: 'sidenav',
  },
]

@NgModule({
  declarations: [
    GeneralSystemSettingsComponent,
    AddHolidayComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSlideToggleModule,
    SharedSystemSetupModule,
    RouterModule.forChild(routes)
  ]
})
export class GeneralSystemSettingsModule { }
