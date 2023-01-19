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
    private generalSystemSettingsStore: CustomerServiceTicketsStore
  ) {}

  updateTickets(tickets: any) {
    this.generalSystemSettingsStore.update((state) => ({
      ...state,
      tickets: tickets,
    }));
  }
}
