import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';

import { Router } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { PolicyStatus } from '@root/pages/customer-service/customer-service-shared/components/policy-status/models/policy-status.model';
import { PolicyCardService } from '../../services/policy-card.service';
import { PolicyCard } from '@root/pages/customer-service/customer-service-shared/components/policy-card/models/policy-card.model';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { PolicyRenewalsCustomerServiceTicketComponent } from '@root/pages/customer-service/policy-renewals/components/policy-renewals-customer-service-ticket/policy-renewals-customer-service-ticket.component';
import { Subscription } from 'rxjs';
import { LayoutService } from '@root/shared/services/layout.service';
import { tickets$ } from '../../store/policy-renewals-tickets.store';

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
    { title: 'Renewal Approved', color: 'bg-[#31CD3D]' },
    { title: 'Closed (No Renewal)', color: 'bg-[#e7e7e7]' },
  ];

  isFilter: boolean = false;

  flag: number = 0;

  tickets: any = null;

  searchBarValue: string = '';

  constructor(
    public policyCardService: PolicyCardService,
    public dialog: MatDialog,
    private router: Router,
    private ref: ChangeDetectorRef,
    private layoutService: LayoutService
  ) {}

  ngOnInit(): void {
    this.policyCardService.getPolicyRenewalTickets();

    this.subscription = tickets$.subscribe((data: any) => {
      this.tickets = data;
      this.ref.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  openFilter() {
    this.router.navigate(
      [
        `${ApplicationRoutes.PolicyRenewals}`,
        {
          outlets: {
            sidenav: `${ApplicationRoutes.Filter}/policyRenewals`,
          },
        },
      ],
      { skipLocationChange: true }
    );

    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

  openDialog(card: {}): void {
    this.dialog
      .open(PolicyRenewalsCustomerServiceTicketComponent, {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '90%',
        width: '95%',
        data: {
          dataKey: card,
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.policyCardService.getPolicyRenewalTickets();

        this.subscription = tickets$.subscribe((data: any) => {
          this.tickets = data;
          this.ref.detectChanges();
        });
      });
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

  onSearchFilter() {
    const filterOption = {
      searchQuery: this.searchBarValue,
    };

    this.policyCardService.filterPolicyRenewalTickets(filterOption);
  }

  onClearFilter() {
    this.searchBarValue = '';

    const filterOption = {
      searchQuery: this.searchBarValue,
    };

    this.policyCardService.filterPolicyRenewalTickets(filterOption);
  }
}
