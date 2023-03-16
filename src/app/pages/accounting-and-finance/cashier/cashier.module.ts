import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Route, RouterModule } from '@angular/router';
import { SecurityGuard } from '@root/shared/guards/security.guard';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { SharedModule } from '@root/shared/shared.module';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';

import { CashierComponent } from './components/cashier/cashier.component';
import { ImportBasketComponent } from './components/import-basket/import-basket.component';
import { ReceiveCashPaymentComponent } from './components/receive-cash-payment/receive-cash-payment.component';
import { ReceivePaymentComponent } from './components/receive-payment/receive-payment.component';
import { ViewBasketAdvancedComponent } from './components/view-basket-advanced/view-basket-advanced.component';
import { ViewBasketComponent } from './components/view-basket/view-basket.component';
import { PrintProcessComponent } from './components/print-process/print-process.component';
import { CheckProcessComponent } from './components/check-process/check-process.component';
import { ReceiveCheckPaymentComponent } from './components/receive-check-payment/receive-check-payment.component';
import { PayMakePaymentComponent } from './components/pay-make-payment/pay-make-payment.component';

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
  declarations: [
    CashierComponent,
    ViewBasketComponent,
    ViewBasketAdvancedComponent,
    ImportBasketComponent,
    ReceivePaymentComponent,
    ReceiveCheckPaymentComponent,
    ReceiveCashPaymentComponent,
    PrintProcessComponent,
    CheckProcessComponent,
    PayMakePaymentComponent,
  ],
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
