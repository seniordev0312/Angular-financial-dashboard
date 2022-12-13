import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PolicyStatus } from '../policy-status/models/policy-status.model';
import { PolicyCardService } from '../../services/policy-card.service';
import { PolicyCard } from '../policy-card/models/policy-card.model';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { PolicyRenewalsCustomerServiceTicketComponent } from '@root/pages/customer-service/policy-renewals/components/policy-renewals-customer-service-ticket/policy-renewals-customer-service-ticket.component';

@Component({
  selector: 'app-policy-renewals',
  templateUrl: './policy-renewals.component.html',
  styleUrls: ['./policy-renewals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyRenewalsComponent implements OnInit {
  steps: PolicyStatus[] = [
    { title: 'Policy Renewal Followup', color: 'bg-[#d8d8d8]' },
    { title: 'In Process', color: 'bg-[#3890cf]' },
    { title: 'Processed (Renewal Issued)', color: 'bg-[#939393]' },
    { title: 'Renewal Approved', color: 'bg-[#199e52]' },
    { title: 'Closed (No Renewal)', color: 'bg-[#e7e7e7]' },
  ];

  followUpCards: PolicyCard[] = [];
  inProcessCards: PolicyCard[] = [];
  processedCards: PolicyCard[] = [];
  approvedCards: PolicyCard[] = [];
  closedCards: PolicyCard[] = [];

  constructor(
    private policyCardService: PolicyCardService,
    public dialog: MatDialog
  ) {}

  openDialog(): void {
    this.dialog.open(PolicyRenewalsCustomerServiceTicketComponent, {
      height: '90%',
      width: '90%',
    });
  }

  ngOnInit(): void {
    this.getCards();
  }

  getCards(): void {
    this.policyCardService
      .getFolllowUpCards()
      .subscribe((cards) => (this.followUpCards = cards));
    this.policyCardService
      .getInProcessCards()
      .subscribe((cards) => (this.inProcessCards = cards));
    this.policyCardService
      .getProcessedCards()
      .subscribe((cards) => (this.processedCards = cards));
    this.policyCardService
      .getApprovedCards()
      .subscribe((cards) => (this.approvedCards = cards));
    this.policyCardService
      .getClosedCards()
      .subscribe((cards) => (this.closedCards = cards));
  }

  drop(event: CdkDragDrop<PolicyCard[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
