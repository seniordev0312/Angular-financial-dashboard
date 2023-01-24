import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Route, RouterModule } from '@angular/router';
import { EntitiesControlModule } from '@root/pages/entities/entities-control/entities-control.module';
import { SecurityGuard } from '@root/shared/guards/security.guard';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { SharedModule } from '@root/shared/shared.module';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { PolicyFilterComponent } from '../customer-service-shared/components/policy-filter/policy-filter.component';
import { CustomerServiceSharedModule } from '../customer-service-shared/customer-service-shared.module';
import { PolicyRenewalsCustomerServiceTicketComponent } from '../policy-renewals/components/policy-renewals-customer-service-ticket/policy-renewals-customer-service-ticket.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactViewComponent } from './components/contact-view/contact-view.component';
import { CustomerServiceTicketComponent } from './components/customer-service-ticket/customer-service-ticket.component';
import { CustomerServiceComponent } from './components/customer-service/customer-service.component';
import { EditHistoryComponent } from './components/followup-history/edit-history/edit-history.component';
import { HistoryListComponent } from './components/followup-history/history-list/history-list.component';
import { LeftBarItemComponent } from './components/left-side-bar/left-bar-item/left-bar-item.component';
import { LeftSideBarComponent } from './components/left-side-bar/left-side-bar.component';
import { NotesComponent } from './components/notes/notes.component';
import { PendingInformaitonCardComponent } from './components/pending-informaiton-card/pending-informaiton-card.component';
import { PolicyInformationComponent } from './components/policy-information/policy-information.component';
import { SalesFlowComponent } from './components/sales-flow/sales-flow.component';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: CustomerServiceComponent,
    data: {
      permission: Permission.CanAccessCustomerService,
    },
    canActivate: [AutoLoginAllRoutesGuard, SecurityGuard],
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
  {
    path: ApplicationRoutes.CustomerService,
    component: SalesFlowComponent,
  },
];

@NgModule({
  declarations: [
    CustomerServiceComponent,
    ContactViewComponent,
    ContactFormComponent,
    LeftBarItemComponent,
    ContactDetailsComponent,
    PolicyInformationComponent,
    LeftSideBarComponent,
    NotesComponent,
    SalesFlowComponent,
    PolicyRenewalsCustomerServiceTicketComponent,
    HistoryListComponent,
    EditHistoryComponent,
    CustomerServiceTicketComponent,
    PendingInformaitonCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MatSidenavModule,
    EntitiesControlModule,
    CdkAccordionModule,
    MatProgressSpinnerModule,
    CustomerServiceSharedModule,
    DragDropModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    ContactViewComponent,
    ContactFormComponent,
    LeftBarItemComponent,
    ContactDetailsComponent,
    PolicyInformationComponent,
    LeftSideBarComponent,
    NotesComponent,
    SalesFlowComponent,
    HistoryListComponent,
    EditHistoryComponent,
  ],
})
export class CustomerServiceModule {}
