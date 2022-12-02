import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemSetupComponent } from './components/system-setup/system-setup.component';
import { Route, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { GeneralSystemSettingsComponent } from './components/general-system-settings/general-system-settings.component';
import { SystemClaimsComponent } from './components/system-claims/system-claims.component';
import { UserSecurityComponent } from './components/user-security/user-security.component';
import { CompanySetupComponent } from './components/company-setup/company-setup.component';
import { CompanyStructureComponent } from './components/company-structure/company-structure.component';
import { ChartOfAccountsComponent } from './components/chart-of-accounts/chart-of-accounts.component';
import { ReferenceTablesComponent } from './components/reference-tables/reference-tables.component';
import { SharedModule } from '@root/shared/shared.module';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

const routes: Route[] = [
  {
    path: '',
    component: SystemSetupComponent,
    data: {
      breadcrumb: undefined
    },
    children: [
      {
        path: ApplicationRoutes.GeneralSystemSettings,
        data: {
          breadcrumb: ApplicationRoutes.GeneralSystemSettings
        },
        component: GeneralSystemSettingsComponent
      },
      {
        path: ApplicationRoutes.SystemClaims,
        data: {
          breadcrumb: ApplicationRoutes.SystemClaims
        },
        component: SystemClaimsComponent
      },
      {
        path: ApplicationRoutes.UserSecurity,
        data: {
          breadcrumb: ApplicationRoutes.UserSecurity
        },
        component: UserSecurityComponent
      },
      {
        path: ApplicationRoutes.CompanySetup,
        data: {
          breadcrumb: ApplicationRoutes.CompanySetup
        },
        component: CompanySetupComponent
      },
      {
        path: ApplicationRoutes.CompanyStructure,
        data: {
          breadcrumb: ApplicationRoutes.CompanyStructure
        },
        component: CompanyStructureComponent
      },
      {
        path: ApplicationRoutes.ChartOfAccounts,
        data: {
          breadcrumb: ApplicationRoutes.ChartOfAccounts
        },
        component: ChartOfAccountsComponent
      },
      {
        path: ApplicationRoutes.ReferenceTables,
        data: {
          breadcrumb: ApplicationRoutes.ReferenceTables
        },
        component: ReferenceTablesComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    SystemSetupComponent,
    GeneralSystemSettingsComponent,
    SystemClaimsComponent,
    UserSecurityComponent,
    CompanySetupComponent,
    CompanyStructureComponent,
    ChartOfAccountsComponent,
    ReferenceTablesComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    MatIconModule,
    MatSidenavModule,
    RouterModule.forChild(routes)
  ]
})
export class SystemSetupModule { }
