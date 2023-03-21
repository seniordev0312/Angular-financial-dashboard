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
import { PolicyFilterComponent } from '../customer-service-shared/components/policy-filter/policy-filter.component';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { SecurityGuard } from '@root/shared/guards/security.guard';
import { MatBadgeModule } from '@angular/material/badge';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: PolicyRenewalsComponent,
    canLoad: [AutoLoginAllRoutesGuard],
  },
  {
    path: `${ApplicationRoutes.Filter}/:ticketType`,
    component: PolicyFilterComponent,
    outlet: 'sidenav',
    data: {
      permission: Permission.CanAddGeneralSystemSetup,
    },
    canActivate: [SecurityGuard],
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
    MatBadgeModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
  ],
})
export class PolicyRenewalsModule {}
