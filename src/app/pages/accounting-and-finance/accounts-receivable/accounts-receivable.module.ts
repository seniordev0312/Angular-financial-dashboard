import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsReceivableComponent } from './components/accounts-receivable/accounts-receivable.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { SecurityGuard } from '@root/shared/guards/security.guard';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: AccountsReceivableComponent,
    data: {
      permission: Permission.CanAccessAccountsPayable,
    },
    canActivate: [AutoLoginAllRoutesGuard, SecurityGuard],
  },
];

@NgModule({
  declarations: [AccountsReceivableComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AccountsReceivableModule {}
