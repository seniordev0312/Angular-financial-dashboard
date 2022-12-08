import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@root/shared/shared.module';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { InputTextModule } from 'primeng/inputtext';
import { SystemSetupEmptyPageComponent } from './system-setup-empty-page/system-setup-empty-page.component';
import { NgModule } from '@angular/core';
import { SharedSystemSetupModule } from './shared-system-setup/shared-system-setup.module';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: SystemSetupEmptyPageComponent,
  },
  {
    path: ApplicationRoutes.GeneralSystemSettings,
    loadChildren: () => import('./general-system-settings/general-system-settings.module').then((m) => m.GeneralSystemSettingsModule)
  },
  {
    path: ApplicationRoutes.SystemClaims,
    loadChildren: () => import('./system-claims/system-claims.module').then((m) => m.SystemClaimsModule)
  },
  {
    path: ApplicationRoutes.UserSecurity,
    loadChildren: () => import('./user-security/user-security.module').then((m) => m.UserSecurityModule)
  },
  {
    path: ApplicationRoutes.CompanySetup,
    loadChildren: () => import('./company-setup/company-setup.module').then((m) => m.CompanySetupModule)
  },
  {
    path: ApplicationRoutes.CompanyStructure,
    loadChildren: () => import('./company-structure/company-structure.module').then((m) => m.CompanyStructureModule)
  },
  {
    path: ApplicationRoutes.ChartOfAccounts,
    loadChildren: () => import('./charts-of-accounts/charts-of-accounts.module').then((m) => m.ChartsOfAccountsModule)
  },
  {
    path: ApplicationRoutes.ReferenceTables,
    loadChildren: () => import('./reference-tables/reference-tables.module').then((m) => m.ReferenceTablesModule)
  }
];

@NgModule({
  declarations: [
    SystemSetupEmptyPageComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    InputTextModule,
    MatIconModule,
    SharedSystemSetupModule,
    RouterModule.forChild(routes)
  ],
})
export class SystemSetupModule { }
