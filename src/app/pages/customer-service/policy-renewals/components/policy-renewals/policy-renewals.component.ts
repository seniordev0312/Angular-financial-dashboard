import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-policy-renewals',
  templateUrl: './policy-renewals.component.html',
  styleUrls: ['./policy-renewals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyRenewalsComponent implements OnInit {
  subscription: Subscription;
  steps: PolicyStatus[] = [
    { title: 'Policy Renewal Followup', color: 'bg-[#d8d8d8]' },
    { title: 'In Process', color: 'bg-[#3890cf]' },
    { title: 'Processed (Renewal Issued)', color: 'bg-[#939393]' },
    { title: 'Renewal Approved', color: 'bg-[#199e52]' },
    { title: 'Closed (No Renewal)', color: 'bg-[#e7e7e7]' },
  ];

  flag: number = 0;
  tickets: any = {};
  constructor(
    public policyCardService: PolicyCardService,
    public dialog: MatDialog,
    private ref: ChangeDetectorRef
  ) {}

  openDialog(card: {}): void {
    this.dialog.open(PolicyRenewalsCustomerServiceTicketComponent, {
      height: '90%',
      width: '90%',
      data: {
        dataKey: card,
      },
    });
  }

  ngOnInit(): void {
    this.subscription = this.policyCardService
      .getPolicyRenewalTickets()
      .subscribe((data: any) => {
        this.tickets = data;
        this.ref.detectChanges();
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  drop(event: CdkDragDrop<PolicyCard[]>, status: number) {
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
      event.container.data[event.currentIndex].status = status;
      this.policyCardService.updatePolicyRenewalTickets(
        event.container.data[event.currentIndex]
      );
      this.openDialog(event.container.data[event.currentIndex]);
    }
  }
}
