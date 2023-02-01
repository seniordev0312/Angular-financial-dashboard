import { InjectionToken } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import {
  persistState,
  sessionStorageStrategy,
} from '@ngneat/elf-persist-state';

export interface PolicyRenewalsTicketsModel {
  tickets: any;
}

const store = createStore(
  {
    name: 'policy-renewals-tickets-store',
  },
  withProps<PolicyRenewalsTicketsModel>({
    tickets: null,
  })
);

persistState(store, {
  storage: sessionStorageStrategy,
});

export const tickets$ = store.pipe(select(({ tickets }) => tickets));

export type PolicyRenewalsTicketsStore = typeof store;
export const POLICY_RENEWALS_TICKETS_STORE = new InjectionToken<
  ReturnType<typeof createStore>
>('Injection Token For Policy Renewals Tickets Store', {
  providedIn: 'root',
  factory: (): PolicyRenewalsTicketsStore => store,
});
