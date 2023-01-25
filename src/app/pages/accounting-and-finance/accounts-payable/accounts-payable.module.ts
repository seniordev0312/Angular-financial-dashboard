import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsPayableComponent } from './components/accounts-payable/accounts-payable.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { SecurityGuard } from '@root/shared/guards/security.guard';
import { MatOptionModule } from '@angular/material/core';
import { SharedModule } from '@root/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: AccountsPayableComponent,
    data: {
      permission: Permission.CanAccessAccountsPayable,
    },
    canActivate: [AutoLoginAllRoutesGuard, SecurityGuard],
  },
];

@NgModule({
  declarations: [AccountsPayableComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatOptionModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    RouterModule.forChild(routes),
  ],
})
export class AccountsPayableModule {}
