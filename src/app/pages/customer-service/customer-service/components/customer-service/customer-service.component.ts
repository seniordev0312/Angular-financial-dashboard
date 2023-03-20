import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { PolicyStatus } from '@root/pages/customer-service/customer-service-shared/components/policy-status/models/policy-status.model';
import { PolicyCard } from '@root/pages/customer-service/customer-service-shared/components/policy-card/models/policy-card.model';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { CustomerServiceTicketComponent } from '../customer-service-ticket/customer-service-ticket.component';
import { CustomerCardService } from '../../services/customer-card.service';
import { LayoutService } from '@root/shared/services/layout.service';
import { Subscription } from 'rxjs';
import { tickets$ } from '../../store/customer-service-tickets.store';
import { SecurityCheckerService } from '@root/shared/services/security-checker.service';

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.component.html',
  styleUrls: ['./customer-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerServiceComponent implements OnInit {
  subscription: Subscription;
  steps: PolicyStatus[] = [
    { title: 'Created/Received Queue', color: 'bg-[#d8d8d8]' },
    { title: 'In Process', color: 'bg-[#0098ef]' },
    { title: 'Processed', color: 'bg-[#c2c2c2]' },
    { title: 'Resolved', color: 'bg-[#31CD3D]' },
    { title: 'Closed', color: 'bg-[#e7e7e7]' },
  ];

  isFilter: boolean = false;
  flag: number = 0;
  numberOfAllTickets: number = 0;
  userId: string = '';
  tickets: any = null;

  searchBarValue: string = '';

  constructor(
    private customerCardService: CustomerCardService,
    public dialog: MatDialog,
    private router: Router,
    private ref: ChangeDetectorRef,
    private layoutService: LayoutService,
    private securityCheckerService: SecurityCheckerService
  ) {}

  ngOnInit(): void {
    this.customerCardService.getCutomerServiceTickets();

    this.subscription = tickets$.subscribe((data: any) => {
      this.tickets = data;
      this.ref.detectChanges();
    });

    this.securityCheckerService.userClaims$.subscribe((data) => {
      this.userId = data?.sub;
      this.ref.detectChanges();
    });

    this.numberOfAllTickets =
      this.tickets.closedTickets.length +
      this.tickets.inProgressTickets.length +
      this.tickets.inQueueTickets.length +
      this.tickets.processedTickets.length +
      this.tickets.resolvedTickets.length;
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  openFilter() {
    this.router.navigate(
      [
        `${ApplicationRoutes.CustomerService}`,
        {
          outlets: {
            sidenav: `${ApplicationRoutes.Filter}/customerService`,
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
    
    this.customerCardService.getTicketData(card.id).subscribe((data: any) => {
      ticketData = data;
      this.ref.detectChanges();

      this.dialog
        .open(CustomerServiceTicketComponent, {
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
          this.customerCardService.getCutomerServiceTickets();

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

      let body = {
        id: event.container.data[event.currentIndex].id,
        status: event.container.data[event.currentIndex].status,
      };

      this.customerCardService.updateCustomServiceTicket(body);
      this.openDialog(event.container.data[event.currentIndex]);
    }
  }

  onSearchFilter() {
    const filterOption: any = {
      searchQuery: this.searchBarValue,
      assignedToId: null,
      fromDateCreated: null,
      toDateCreated: null,
      fromDateModified: null,
      toDateModified: null,
      communicationChannelId: null,
    };

    this.customerCardService.filterCustomerServiceTickets(filterOption);
  }

  filterByAssignedTo(filterMode: string) {
    let assignedId: string;

    if (filterMode == 'personal') assignedId = this.userId;
    else if (filterMode == 'all') assignedId = null;

    const filterOption: any = {
      searchQuery: null,
      assignedToId: assignedId,
      fromDateCreated: null,
      toDateCreated: null,
      fromDateModified: null,
      toDateModified: null,
      communicationChannelId: null,
    };

    this.customerCardService.filterCustomerServiceTickets(filterOption);
  }

  onClearFilter() {
    this.searchBarValue = '';

    const filterOption = {
      searchQuery: this.searchBarValue,
    };

    this.customerCardService.filterCustomerServiceTickets(filterOption);
  }
}
