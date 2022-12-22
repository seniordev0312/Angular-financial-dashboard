import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { SharedModule } from '@root/shared/shared.module';

import { PolicyCardComponent } from './components/policy-card/policy-card.component';
import { PolicyFilterComponent } from './components/policy-filter/policy-filter.component';
import { PolicyRenewalsComponent } from './components/policy-renewals/policy-renewals.component';
import { PolicySortComponent } from './components/policy-sort/policy-sort.component';
import { PolicyStatusComponent } from './components/policy-status/policy-status.component';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: PolicyRenewalsComponent,
    canLoad: [AutoLoginAllRoutesGuard]
  },
];

@NgModule({
  declarations: [
    PolicyRenewalsComponent,
    PolicySortComponent,
    PolicyCardComponent,
    PolicyStatusComponent,
    PolicyFilterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    DragDropModule,
    RouterModule.forChild(routes),
    MatSidenavModule
  ],
})
export class PolicyRenewalsModule { }
