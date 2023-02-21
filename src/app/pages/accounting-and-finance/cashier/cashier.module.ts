import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashierComponent } from './components/cashier/cashier.component';
import { Route, RouterModule } from '@angular/router';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '@root/shared/shared.module';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { SecurityGuard } from '@root/shared/guards/security.guard';
import { TillViewComponent } from './components/till-view/till-view.component';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: CashierComponent,
    data: {
      permission: Permission.CanAccessCashier,
    },
    canActivate: [AutoLoginAllRoutesGuard, SecurityGuard],
  },
];

@NgModule({
  declarations: [CashierComponent, TillViewComponent],
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
export class CashierModule {}
