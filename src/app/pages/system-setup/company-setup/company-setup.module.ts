import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanySetupComponent } from './components/company-setup/company-setup.component';
import { SharedModule } from '@root/shared/shared.module';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { SharedSystemSetupModule } from '../shared-system-setup/shared-system-setup.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { SecurityGuard } from '@root/shared/guards/security.guard';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: CompanySetupComponent,
    data: {
      permission: Permission.CanAccessCompanySetup
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
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
    SharedSystemSetupModule,
    RouterModule.forChild(routes)
  ]
})
export class CompanySetupModule { }
