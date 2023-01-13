import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '@root/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { CustomerServiceSharedModule } from '../customer-service-shared/customer-service-shared.module';
import { PolicyRenewalsComponent } from './components/policy-renewals/policy-renewals.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: PolicyRenewalsComponent,
    canLoad: [AutoLoginAllRoutesGuard],
  },
];

@NgModule({
  declarations: [PolicyRenewalsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MatToolbarModule,
    CdkAccordionModule,
    CustomerServiceSharedModule,
    DragDropModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
  ],
})
export class PolicyRenewalsModule {}
