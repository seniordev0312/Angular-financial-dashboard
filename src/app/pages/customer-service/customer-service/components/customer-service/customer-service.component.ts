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
    { title: 'In Process', color: 'bg-[#3890cf]' },
    { title: 'Processed', color: 'bg-[#939393]' },
    { title: 'Resolved', color: 'bg-[#31CD3D]' },
    { title: 'Closed', color: 'bg-[#e7e7e7]' },
  ];

  isFilter: boolean = false;
  flag: number = 0;
  tickets: any = null;

  searchBarValue: string = '';

  constructor(
    private customerCardService: CustomerCardService,
    public dialog: MatDialog,
    private router: Router,
    private ref: ChangeDetectorRef,
    private layoutService: LayoutService
  ) {}

  ngOnInit(): void {
    this.customerCardService.getCutomerServiceTickets();

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

  openDialog(card: {}): void {
    this.dialog
      .open(CustomerServiceTicketComponent, {
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
        this.customerCardService.getCutomerServiceTickets();

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

      this.customerCardService.updateCustomServiceTickets(
        event.container.data[event.currentIndex]
      );
      this.openDialog(event.container.data[event.currentIndex]);
    }
  }

  onSearchFilter() {
    const filterOption = {
      searchQuery: this.searchBarValue,
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
