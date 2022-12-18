import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartOfAccountsComponent } from './components/chart-of-accounts/chart-of-accounts.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { SharedModule } from '@root/shared/shared.module';
import { SharedSystemSetupModule } from '../shared-system-setup/shared-system-setup.module';
import { TableModule } from 'primeng/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { AddChartOfAccountsComponent } from './components/add-chart-of-accounts/add-chart-of-accounts.component';
import { MatRadioModule } from '@angular/material/radio';
import { AccountViewComponent } from './components/account-view/account-view.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { AccountViewTableComponent } from './components/account-view-table/account-view-table.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { SecurityGuard } from '@root/shared/guards/security.guard';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: ChartOfAccountsComponent,
    data: {
      permission: Permission.CanAccessChartOfAccounts
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
  },
  {
    path: ApplicationRoutes.Add,
    component: AddChartOfAccountsComponent,
    outlet: 'sidenav',
    data: {
      permission: Permission.CanAddChartOfAccounts
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
  },
  {
    path: `${ApplicationRoutes.Add}/:id`,
    component: AddChartOfAccountsComponent,
    outlet: 'sidenav',
    data: {
      permission: Permission.CanEditChartOfAccounts
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
  },
  {
    path: ApplicationRoutes.ViewAccount,
    component: AccountViewComponent,
    data: {
      permission: Permission.CanAddChartOfAccounts
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
  }
];

@NgModule({
  declarations: [
    ChartOfAccountsComponent,
    AddChartOfAccountsComponent,
    AccountViewComponent,
    AccountViewTableComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    MatSlideToggleModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SharedSystemSetupModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    MatDatepickerModule,
  ],
})
export class ChartsOfAccountsModule { }
