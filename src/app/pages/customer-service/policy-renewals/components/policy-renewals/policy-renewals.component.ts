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
import {
  numberOfPolicyRenewalAppliedFilters$,
  policyRenewalFilterOptions$,
  tickets$,
} from '../../store/policy-renewals-tickets.store';
import { SecurityCheckerService } from '@root/shared/services/security-checker.service';
import { PolicyRenewalsTicketsRepository } from '../../store/policy-renewals-tickets.repository';
import { PolicyRenewalSignalRService } from '../../services/policy-renewal-signalr.service';

@Component({
  selector: 'app-policy-renewals',
  templateUrl: './policy-renewals.component.html',
  styleUrls: ['./policy-renewals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyRenewalsComponent implements OnInit {
  subscription: Subscription;

  steps: PolicyStatus[] = [];

  isFilter: boolean = false;
  isAllFilterSelected: boolean = true;

  flag: number = 0;
  numberAllTickets: number = 0;
  numberPersonalTickets: number = 0;
  numberOfPolicyRenewalAppliedFilters: number = 0;

  tickets: any = null;

  searchBarValue: string = '';
  userId: string = '';

  policyRenewalFilterOptions: any = {
    searchQuery: '',
    assignedToId: null,
    fromDateCreated: null,
    toDateCreated: null,
    fromDateModified: null,
    toDateModified: null,
    communicationChannelId: null,
    followUpResponse: null,
    followUpStatus: null,
    category: null,
  };

  constructor(
    public policyCardService: PolicyCardService,
    public dialog: MatDialog,
    private router: Router,
    private ref: ChangeDetectorRef,
    private layoutService: LayoutService,
    private securityCheckerService: SecurityCheckerService,
    private policyRenewalsTicketsRepository: PolicyRenewalsTicketsRepository,
    public policyRenewalSignalRService: PolicyRenewalSignalRService
  ) {}

  ngOnInit(): void {
    this.policyCardService.getPolicyRenewalTickets();
    this.policyRenewalSignalRService.initConnection();

    this.subscription = this.policyCardService
      .getFollowUpStatusApi()
      .subscribe((data: any) => {
        this.steps = data.map((e: any) => ({
          id: e.value,
          title: this.getStatusFullName(e.value),
          color: this.getStatusColor(e.value),
        }));
        this.ref.detectChanges();
      });

    this.subscription = tickets$.subscribe((data: any) => {
      this.tickets = data;
      if (this.tickets) {
        this.numberAllTickets = this.tickets.all;
        this.numberPersonalTickets = this.tickets.personal;
      }
      this.ref.detectChanges();
    });

    this.securityCheckerService.userClaims$.subscribe((data) => {
      this.userId = data?.sub;
      this.ref.detectChanges();
    });

    this.subscription = policyRenewalFilterOptions$.subscribe((data: any) => {
      if (data) this.policyRenewalFilterOptions = data;
      else {
        this.policyRenewalFilterOptions = {
          searchQuery: '',
          assignedToId: null,
          fromDateCreated: null,
          toDateCreated: null,
          fromDateModified: null,
          toDateModified: null,
          communicationChannelId: null,
          followUpResponse: null,
          followUpStatus: null,
          category: null,
        };
      }
      this.ref.detectChanges();
    });

    this.subscription = numberOfPolicyRenewalAppliedFilters$.subscribe(
      (data: any) => {
        this.numberOfPolicyRenewalAppliedFilters = data;
        this.ref.detectChanges();
      }
    );
  }

  getStatusFullName(statusId: Number): string {
    switch (statusId) {
      case 1:
        return 'Policy Renewal Followup';
      case 2:
        return 'In Process';
      case 3:
        return 'Processed (Renewal Issued)';
      case 4:
        return 'Renewal Approved';
      case 5:
        return 'Closed (No Renewal)';
      default:
        return '';
    }
  }

  getStatusColor(statusId: number): string {
    switch (statusId) {
      case 1:
        return 'bg-[#d8d8d8]';
      case 2:
        return 'bg-[#0098ef]';
      case 3:
        return 'bg-[#c2c2c2]';
      case 4:
        return 'bg-[#31CD3D]';
      case 5:
        return 'bg-[#e7e7e7]';
      default:
        return '';
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();

    this.policyRenewalSignalRService.stopSignalRConnection();
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

  openDialog(card: any): void {
    let ticketData: any = null;

    this.policyCardService.getTicketData(card.id).subscribe((data: any) => {
      ticketData = data;
      this.ref.detectChanges();

      this.dialog
        .open(PolicyRenewalsCustomerServiceTicketComponent, {
          maxWidth: '100vw',
          maxHeight: '100vh',
          height: '90%',
          width: '95%',
          data: {
            dataKey: ticketData,
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
    this.policyRenewalFilterOptions.searchQuery = this.searchBarValue;

    this.policyCardService.filterPolicyRenewalTickets(
      this.policyRenewalFilterOptions
    );
    this.policyRenewalsTicketsRepository.updateFilterOptions(
      this.policyRenewalFilterOptions
    );
  }

  onClearSearchFilter() {
    if (this.searchBarValue !== '') {
      this.searchBarValue = '';

      this.policyRenewalFilterOptions.searchQuery = this.searchBarValue;

      this.policyCardService.filterPolicyRenewalTickets(
        this.policyRenewalFilterOptions
      );

      this.policyRenewalsTicketsRepository.updateFilterOptions(
        this.policyRenewalFilterOptions
      );
    }
  }

  filterByAssignedTo(filterMode: string) {
    let assignedId: string;

    if (filterMode == 'personal') {
      assignedId = this.userId;
      this.isAllFilterSelected = false;
    } else if (filterMode == 'all') {
      assignedId = null;
      this.isAllFilterSelected = true;
    }

    this.policyRenewalFilterOptions.assignedToId = assignedId;

    this.policyCardService.filterPolicyRenewalTickets(
      this.policyRenewalFilterOptions
    );

    this.policyRenewalsTicketsRepository.updateFilterOptions(
      this.policyRenewalFilterOptions
    );
  }
}
