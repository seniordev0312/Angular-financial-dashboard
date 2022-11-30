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

const routes: Route[] = [
  {
    path: '',
    component: SystemSetupComponent,
    children: [
      {
        path: 'general-system-settings',
        component: GeneralSystemSettingsComponent
      },
      {
        path: 'system-claims',
        component: SystemClaimsComponent
      },
      {
        path: 'user-security',
        component: UserSecurityComponent
      },
      {
        path: 'company-setup',
        component: CompanySetupComponent
      },
      {
        path: 'company-structure',
        component: CompanyStructureComponent
      },
      {
        path: 'chart-of-accounts',
        component: ChartOfAccountsComponent
      },
      {
        path: 'reference-tables',
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
