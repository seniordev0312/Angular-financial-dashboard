import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
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
import {
  customerServiceFilterOptions$,
  numberOfCustomerServiceAppliedFilters$,
  tickets$,
} from '../../store/customer-service-tickets.store';
import { SecurityCheckerService } from '@root/shared/services/security-checker.service';
import { CustomerServiceTicketsRepository } from '../../store/customer-service-tickets.repository';
import { CustomerServiceStatus } from '@root/pages/customer-service/customer-service-shared/components/policy-status/models/customer-service-status.model';
import { CustomerServiceSignalRService } from '../../services/customer-service-signalr.service';

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.component.html',
  styleUrls: ['./customer-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerServiceComponent implements OnInit {
  subscription: Subscription;

  steps: CustomerServiceStatus[] = [];

  isFilter: boolean = false;
  isAllFilterSelected: boolean = true;
  flag: number = 0;
  numberAllTickets: number = 0;
  numberPersonalTickets: number = 0;
  userId: string = '';
  tickets: any = null;
  customerServiceFilterOptions: any = {
    searchQuery: null,
    assignedToId: null,
    fromDateCreated: null,
    toDateCreated: null,
    fromDateModified: null,
    toDateModified: null,
    communicationChannelId: null,
  };
  numberOfCustomerServiceAppliedFilters: number = 0;

  searchBarValue: string = '';

  constructor(
    private customerCardService: CustomerCardService,
    public dialog: MatDialog,
    private router: Router,
    private ref: ChangeDetectorRef,
    private layoutService: LayoutService,
    private securityCheckerService: SecurityCheckerService,
    private customerServiceTicketsRepository: CustomerServiceTicketsRepository,
    public customerServiceSignalRService: CustomerServiceSignalRService
  ) {}

  ngOnInit(): void {
    this.customerCardService.getCutomerServiceTickets();

    this.customerServiceSignalRService.initConnection();

    this.subscription = this.customerCardService
      .getTicketStatusApi()
      .subscribe((data: any) => {
        this.steps = data.map((e: any) => ({
          id: e.value,
          title: e.code,
          color: this.getStatusColor(e.value),
        }));
        this.ref.detectChanges();
      });

    this.subscription = tickets$.subscribe((data: any) => {
      this.tickets = data;
      this.numberAllTickets = this.tickets.all;
      this.numberPersonalTickets = this.tickets.personal;
      this.ref.detectChanges();
    });

    this.subscription = customerServiceFilterOptions$.subscribe((data: any) => {
      this.customerServiceFilterOptions = data;
      this.ref.detectChanges();
    });

    this.subscription = numberOfCustomerServiceAppliedFilters$.subscribe(
      (data: any) => {
        this.numberOfCustomerServiceAppliedFilters = data;
        this.ref.detectChanges();
      }
    );

    this.securityCheckerService.userClaims$.subscribe((data) => {
      this.userId = data?.sub;
      this.ref.detectChanges();
    });
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

    this.customerServiceSignalRService.stopSignalRConnection();
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

    if (filterMode == 'personal') {
      assignedId = this.userId;
      this.isAllFilterSelected = false;
    } else if (filterMode == 'all') {
      assignedId = null;
      this.isAllFilterSelected = true;
    }
    this.customerServiceFilterOptions.assignedToId = assignedId;

    this.customerCardService.filterCustomerServiceTickets(
      this.customerServiceFilterOptions
    );

    this.customerServiceTicketsRepository.updateFilterOptions(
      this.customerServiceFilterOptions
    );
  }

  onClearFilter() {
    this.searchBarValue = '';

    const filterOption = {
      searchQuery: this.searchBarValue,
    };

    this.customerCardService.filterCustomerServiceTickets(filterOption);
  }
}
