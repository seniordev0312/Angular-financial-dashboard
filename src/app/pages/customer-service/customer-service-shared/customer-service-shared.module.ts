import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicySortComponent } from './components/policy-sort/policy-sort.component';
import { PolicyCardComponent } from './components/policy-card/policy-card.component';
import { PolicyStatusComponent } from './components/policy-status/policy-status.component';
import { PolicyFilterComponent } from './components/policy-filter/policy-filter.component';
import { SharedModule } from '@root/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { DetailsAccordionComponent } from './components/details-accordion/details-accordion.component';
import { OutcomeAccordionComponent } from './components/outcome-accordion/outcome-accordion.component';
import { CustomerServiceFilterComponent } from './components/customer-service-filter/customer-service-filter.component';

@NgModule({
  declarations: [
    PolicySortComponent,
    PolicyCardComponent,
    PolicyStatusComponent,
    PolicyFilterComponent,
    DetailsAccordionComponent,
    OutcomeAccordionComponent,
    CustomerServiceFilterComponent
  ],
  imports: [CommonModule, SharedModule, MatIconModule],
  exports: [
    PolicySortComponent,
    PolicyCardComponent,
    PolicyStatusComponent,
    PolicyFilterComponent,
    DetailsAccordionComponent,
    OutcomeAccordionComponent,
    CustomerServiceFilterComponent
  ],
})
export class CustomerServiceSharedModule {}
