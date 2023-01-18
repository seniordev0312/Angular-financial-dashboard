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

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.component.html',
  styleUrls: ['./customer-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerServiceComponent implements OnInit {
  subscription: Subscription;
  steps: PolicyStatus[] = [
    { title: 'Policy Renewal Followup', color: 'bg-[#d8d8d8]' },
    { title: 'In Process', color: 'bg-[#3890cf]' },
    { title: 'Processed (Renewal Issued)', color: 'bg-[#939393]' },
    { title: 'Renewal Approved', color: 'bg-[#199e52]' },
    { title: 'Closed (No Renewal)', color: 'bg-[#e7e7e7]' },
  ];

  isFilter: boolean = false;
  flag: number = 0;
  tickets: any = {};
  constructor(
    public customerCardService: CustomerCardService,
    public dialog: MatDialog,
    private router: Router,
    private ref: ChangeDetectorRef,
    private layoutService: LayoutService
  ) {}

  openFilter() {
    this.router.navigate(
      [
        `${ApplicationRoutes.CustomerService}`,
        {
          outlets: {
            sidenav: ApplicationRoutes.Filter,
          },
        },
      ],
      { skipLocationChange: true }
    );

    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

  openDialog(card: {}): void {
    this.dialog.open(CustomerServiceTicketComponent, {
      height: '90%',
      width: '90%',
      data: {
        dataKey: card,
      },
    });
  }

  ngOnInit(): void {
    this.subscription = this.customerCardService
      .getCutomerServiceTickets()
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
      this.customerCardService.updateCustomServiceTickets(
        event.container.data[event.currentIndex]
      );
      this.openDialog(event.container.data[event.currentIndex]);
    }
  }
}
