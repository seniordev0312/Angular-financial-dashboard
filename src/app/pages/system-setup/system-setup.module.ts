import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { SharedModule } from '@root/shared/shared.module';
import { SystemSetupEmptyPageComponent } from './system-setup-empty-page/system-setup-empty-page.component';
import { SystemSetupComponent } from './system-setup/system-setup.component';

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
        loadChildren: () => import('@root/pages/system-setup/general-system-settings/general-system-settings.module').then((m) => m.GeneralSystemSettingsModule)
      },
      {
        path: ApplicationRoutes.SystemClaims,
        loadChildren: () => import('@root/pages/system-setup/system-claims/system-claims.module').then(m => m.SystemClaimsModule)
      },
      {
        path: ApplicationRoutes.UserSecurity,
        loadChildren: () => import('@root/pages/system-setup/user-security/user-security.module').then(m => m.UserSecurityModule)
      },
      {
        path: ApplicationRoutes.CompanySetup,
        loadChildren: () => import('@root/pages/system-setup/company-setup/company-setup.module').then(m => m.CompanySetupModule)
      },
      {
        path: ApplicationRoutes.CompanyStructure,
        loadChildren: () => import('@root/pages/system-setup/company-structure/company-structure.module').then(m => m.CompanyStructureModule)
      },
      {
        path: ApplicationRoutes.ChartOfAccounts,
        loadChildren: () => import('@root/pages/system-setup/chart-of-accounts/chart-of-accounts.module').then(m => m.ChartOfAccountsModule)
      },
      {
        path: ApplicationRoutes.ReferenceTables,
        loadChildren: () => import('@root/pages/system-setup/reference-tables/reference-tables.module').then(m => m.ReferenceTablesModule)
      }
    ]
  }
];

@NgModule({
  declarations: [
    SystemSetupComponent,
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
