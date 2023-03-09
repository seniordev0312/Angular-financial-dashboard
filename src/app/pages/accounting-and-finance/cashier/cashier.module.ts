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
import { SecurityGuard } from '@root/shared/guards/security.guard';import { ViewBasketComponent } from './components/view-basket/view-basket.component';
import { ViewBasketAdvancedComponent } from './components/view-basket-advanced/view-basket-advanced.component';
import { ImportBasketComponent } from './components/import-basket/import-basket.component';
import { ReceivePaymentComponent } from './components/receive-payment/receive-payment.component';
import { ReceiveCashPaymentComponent } from './components/receive-cash-payment/receive-cash-payment.component';
import { PrintReviewComponent } from './components/print-review/print-review.component';

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

  declarations: [CashierComponent, ViewBasketComponent, ViewBasketAdvancedComponent, ImportBasketComponent, ReceivePaymentComponent, ReceiveCashPaymentComponent, PrintReviewComponent],
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
