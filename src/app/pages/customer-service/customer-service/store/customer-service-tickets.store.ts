import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import {
  persistState,
  sessionStorageStrategy,
} from '@ngneat/elf-persist-state';

export interface CustomerServiceTicketsModel {
  tickets: any;
  customerServiceFilterOptions: any;
  numberOfCustomerServiceAppliedFilters: any;
}

const store = createStore(
  {
    name: 'customer-service-tickets-store',
  },
  withProps<CustomerServiceTicketsModel>({
    tickets: null,
    customerServiceFilterOptions: null,
    numberOfCustomerServiceAppliedFilters: null,
  })
);

persistState(store, {
  storage: sessionStorageStrategy,
});

export const tickets$ = store.pipe(select(({ tickets }) => tickets));
export const customerServiceFilterOptions$ = store.pipe(select(({ customerServiceFilterOptions }) => customerServiceFilterOptions));
export const numberOfCustomerServiceAppliedFilters$ = store.pipe(select(({ numberOfCustomerServiceAppliedFilters }) => numberOfCustomerServiceAppliedFilters));

export type CustomerServiceTicketsStore = typeof store;
export const CUSTOMER_SERVICE_TICKETS_STORE = new InjectionToken<
  ReturnType<typeof createStore>
>('Injection Token For Custome Service Tickets Store', {
  providedIn: 'root',
  factory: (): CustomerServiceTicketsStore => store,
});
