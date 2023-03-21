import { Inject, Injectable } from '@angular/core';

import {
  CUSTOMER_SERVICE_TICKETS_STORE,
  CustomerServiceTicketsStore,
} from './customer-service-tickets.store';

@Injectable({
  providedIn: 'root',
})
export class CustomerServiceTicketsRepository {
  constructor(
    @Inject(CUSTOMER_SERVICE_TICKETS_STORE)
    private customerServiceTicketsStore: CustomerServiceTicketsStore
  ) {}

  updateTickets(tickets: any) {
    this.customerServiceTicketsStore.update((state) => ({
      ...state,
      tickets: tickets,
    }));
  }

  updateFilterOptions(customerServiceFilterOptions: any) {
    this.customerServiceTicketsStore.update((state) => ({
      ...state,
      customerServiceFilterOptions: customerServiceFilterOptions,
    }));
  }
  
  updateNumberOfAppliedFilters(numberOfCustomerServiceAppliedFilters: any) {
    this.customerServiceTicketsStore.update((state) => ({
      ...state,
      numberOfCustomerServiceAppliedFilters: numberOfCustomerServiceAppliedFilters,
    }));
  }

  getKeyType(id: any) {
    let key = null;

    switch (id) {
      case 'cdk-drop-list-0':
        key = 'closedTickets';
        break;
      case 'cdk-drop-list-1':
        key = 'inProgressTickets';
        break;
      case 'cdk-drop-list-2':
        key = 'inQueueTickets';
        break;
      case 'cdk-drop-list-3':
        key = 'processedTickets';
        break;
      case 'cdk-drop-list-4':
        key = 'resolvedTickets';
        break;
      default:
        break;
    }

    return key;
  }
}
