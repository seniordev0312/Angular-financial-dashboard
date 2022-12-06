import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemSetupComponent } from './components/system-setup/system-setup.component';
import { Route, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { SystemClaimsComponent } from './components/system-claims/system-claims.component';
import { UserSecurityComponent } from './components/user-security/user-security.component';
import { CompanySetupComponent } from './components/company-setup/company-setup.component';
import { CompanyStructureComponent } from './components/company-structure/company-structure.component';
import { ChartOfAccountsComponent } from './components/chart-of-accounts/chart-of-accounts.component';
import { ReferenceTablesComponent } from './components/reference-tables/reference-tables.component';
import { SharedModule } from '@root/shared/shared.module';
import { SystemSetupEmptyPageComponent } from './components/system-setup-empty-page/system-setup-empty-page.component';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

const routes: Route[] = [
  {
    path: '',
    component: SystemSetupComponent,
    children: [
      {
        path: '',
        component: SystemSetupEmptyPageComponent,
      },
      {
        path: ApplicationRoutes.GeneralSystemSettings,
        loadChildren: () => import('@root/pages/system-setup/components/general-system-settings/general-system-settings.module').then((m) => m.GeneralSystemSettingsModule)
      },
      {
        path: ApplicationRoutes.SystemClaims,
        component: SystemClaimsComponent
      },
      {
        path: ApplicationRoutes.UserSecurity,
        component: UserSecurityComponent
      },
      {
        path: ApplicationRoutes.CompanySetup,
        component: CompanySetupComponent
      },
      {
        path: ApplicationRoutes.CompanyStructure,
        component: CompanyStructureComponent
      },
      {
        path: ApplicationRoutes.ChartOfAccounts,
        component: ChartOfAccountsComponent
      },
      {
        path: ApplicationRoutes.ReferenceTables,
        component: ReferenceTablesComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    SystemSetupComponent,
    SystemClaimsComponent,
    UserSecurityComponent,
    CompanySetupComponent,
    CompanyStructureComponent,
    ChartOfAccountsComponent,
    ReferenceTablesComponent,
    SystemSetupEmptyPageComponent
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
