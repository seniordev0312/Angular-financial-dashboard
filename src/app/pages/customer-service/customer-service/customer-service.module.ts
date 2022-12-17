import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { CustomerServiceComponent } from './components/customer-service/customer-service.component';
import { SharedModule } from '@root/shared/shared.module';
import { ContactViewComponent } from './components/contact-view/contact-view.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { LeftBarItemComponent } from './components/left-side-bar/left-bar-item/left-bar-item.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { PolicyInformationComponent } from './components/policy-information/policy-information.component';
import { LeftSideBarComponent } from './components/left-side-bar/left-side-bar.component';
import { NotesComponent } from './components/notes/notes.component';
import { PolicyRenewalsCustomerServiceTicketComponent } from '../policy-renewals/components/policy-renewals-customer-service-ticket/policy-renewals-customer-service-ticket.component';
import { SalesFlowComponent } from './components/sales-flow/sales-flow.component';
import { HistoryListComponent } from './components/followup-history/history-list/history-list.component';
import { EditHistoryComponent } from './components/followup-history/edit-history/edit-history.component';
import { EntitiesControlModule } from '@root/pages/entities/entities-control/entities-control.module';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { SecurityGuard } from '@root/shared/guards/security.guard';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: CustomerServiceComponent,
    data: {
      permission: Permission.CanAccessCustomerService
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
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
    PolicyRenewalsCustomerServiceTicketComponent,
    SalesFlowComponent,
    HistoryListComponent,
    EditHistoryComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MatSidenavModule,
    EntitiesControlModule,
    CdkAccordionModule,
    RouterModule.forChild(routes),
  ],
})
export class CustomerServiceModule { }
