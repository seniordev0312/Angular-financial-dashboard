import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralSystemSettingsComponent } from './components/general-system-settings/general-system-settings.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { SharedModule } from '@root/shared/shared.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedSystemSetupModule } from '../shared-system-setup/shared-system-setup.module';
import { AddHolidayComponent } from './components/add-holiday/add-holiday.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { SecurityGuard } from '@root/shared/guards/security.guard';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: GeneralSystemSettingsComponent,
    data: {
      permission: Permission.CanAccessGeneralSystemSetup
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
  },
  {
    path: ApplicationRoutes.Add,
    component: AddHolidayComponent,
    outlet: 'sidenav',
    data: {
      permission: Permission.CanAddGeneralSystemSetup
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
  },
  {
    path: `${ApplicationRoutes.Add}/:id/:name/:startDate/:endDate/:offDay`,
    component: AddHolidayComponent,
    outlet: 'sidenav',
    data: {
      permission: Permission.CanEditGeneralSystemSetup
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
  },
]

@NgModule({
  declarations: [
    GeneralSystemSettingsComponent,
    AddHolidayComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    SharedModule,
    MatSlideToggleModule,
    SharedSystemSetupModule,
    FormsModule,
    MatDatepickerModule,
    RouterModule.forChild(routes)
  ]
})
export class GeneralSystemSettingsModule { }
