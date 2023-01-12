import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { PolicyCard } from '../components/policy-card/models/policy-card.model';
import { PolicyCards } from './mock-policy-cards-follow';
import { PolicyCardsInprocess } from './mock-policy-cards-inprocss';
import { PolicyCardsApproved } from './mock-policy-cards-approved';
import { PolicyCardsProcessed } from './mock-policy-cards-processed';
import { PolicyCardsClosed } from './mock-policy-cards-closed';

@Injectable({
  providedIn: 'root',
})
export class PolicyCardService {
  constructor() {}

  getFolllowUpCards(): Observable<PolicyCard[]> {
    const cards = of(PolicyCards);
    return cards;
  };

  getInProcessCards(): Observable<PolicyCard[]> {
    const cards = of(PolicyCardsInprocess);
    return cards;
  };

  getProcessedCards(): Observable<PolicyCard[]> {
    const cards = of(PolicyCardsProcessed);
    return cards;
  };

  getApprovedCards(): Observable<PolicyCard[]> {
    const cards = of(PolicyCardsApproved);
    return cards;
  };

  getClosedCards(): Observable<PolicyCard[]> {
    const cards = of(PolicyCardsClosed);
    return cards;
  };
}
