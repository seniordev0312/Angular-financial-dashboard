import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import {
  persistState,
  sessionStorageStrategy,
} from '@ngneat/elf-persist-state';

export interface CustomerServiceTicketsModel {
  tickets: any;
}

const store = createStore(
  {
    name: 'customer-service-tickets-store',
  },
  withProps<CustomerServiceTicketsModel>({
    tickets: null,
  })
);

persistState(store, {
  storage: sessionStorageStrategy,
});

export const tickets$ = store.pipe(select(({ tickets }) => tickets));

export type CustomerServiceTicketsStore = typeof store;
export const CUSTOMER_SERVICE_TICKETS_STORE = new InjectionToken<
  ReturnType<typeof createStore>
>('Injection Token For Custome Service Tickets Store', {
  providedIn: 'root',
  factory: (): CustomerServiceTicketsStore => store,
});
