import { Inject, Injectable } from '@angular/core';

import {
  POLICY_RENEWALS_TICKETS_STORE,
  PolicyRenewalsTicketsStore,
} from './policy-renewals-tickets.store';

@Injectable({
  providedIn: 'root',
})
export class PolicyRenewalsTicketsRepository {
  constructor(
    @Inject(POLICY_RENEWALS_TICKETS_STORE)
    private policyRenewalsTicketsStore: PolicyRenewalsTicketsStore
  ) {}

  updateTickets(tickets: any) {
    this.policyRenewalsTicketsStore.update((state) => ({
      ...state,
      tickets: tickets,
    }));
  }

  updateFilterOptions(policyRenewalFilterOptions: any) {
    this.policyRenewalsTicketsStore.update((state) => ({
      ...state,
      policyRenewalFilterOptions: policyRenewalFilterOptions,
    }));
  }

   updateNumberOfAppliedFilters(numberOfPolicyRenewalAppliedFilters: any) {
    this.policyRenewalsTicketsStore.update((state) => ({
      ...state,
      numberOfPolicyRenewalAppliedFilters: numberOfPolicyRenewalAppliedFilters,
    }));
  }
}
