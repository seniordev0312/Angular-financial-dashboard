import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
//import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { PolicyCardService } from '@root/pages/customer-service/policy-renewals/services/policy-card.service';
import { CustomerCardService } from '@root/pages/customer-service/customer-service/services/customer-card.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { CustomerServiceTicketsRepository } from '@root/pages/customer-service/customer-service/store/customer-service-tickets.repository';
import {
  customerServiceFilterOptions$,
  numberOfCustomerServiceAppliedFilters$,
} from '@root/pages/customer-service/customer-service/store/customer-service-tickets.store';

@Component({
  selector: 'app-customer-service-filter',
  templateUrl: './customer-service-filter.component.html',
  styleUrls: ['./customer-service-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerServiceFilterComponent implements OnInit {
  @Input() policyFilterDrawer: any;
  @Input() filteringArray: any;
  @Output() filteringArrayChange = new EventEmitter<any>();

  ticketType: any;
  fromDateCreated: Date = null;
  toDateCreated: Date = null;
  fromDateModified: Date = null;
  toDateModified: Date = null;

  subscription: Subscription;
  ticketTypeList: any;
  ticketTypeListControl: FormControl = new FormControl({ id: 0, value: null });
  selectedTicketType: any = null;

  cstSourceList: any;
  cstSourceListControl: FormControl = new FormControl({ id: 0, value: null });
  selectedCstSource: any = null;

  assignedToListControl: FormControl = new FormControl({ id: -1, value: null });
  assignedToList: any;
  selectedAssignedTo: any = null;

  public customerServiceFilterOptions: any = {};
  public numberOfCustomerServiceAppliedFilters: number = 0;

  constructor(
    public policyCardService: PolicyCardService,
    public customerCardService: CustomerCardService,
    private activeRoute: ActivatedRoute,
    private layoutService: LayoutService,
    private router: Router,
    private ref: ChangeDetectorRef,
    private customerServiceTicketsRepository: CustomerServiceTicketsRepository
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params) => {
      this.ticketType = params.get('ticketType');
    });

    this.subscription = customerServiceFilterOptions$.subscribe((data: any) => {
      if (data) {
        this.customerServiceFilterOptions = data;
        this.selectedAssignedTo =
          this.customerServiceFilterOptions.assignedToId;
      } else {
        this.customerServiceFilterOptions = {
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

    this.subscription = numberOfCustomerServiceAppliedFilters$.subscribe(
      (data: any) => {
        this.numberOfCustomerServiceAppliedFilters = data;
        this.ref.detectChanges();
      }
    );

    this.subscription = this.customerCardService
      .getCustomerServiceTicketTypeApi()
      .subscribe((data: any) => {
        this.ticketTypeList = data.map((e: any) => ({
          id: e.id,
          value: e.name,
        }));
        this.ref.detectChanges();
      });

    this.subscription = this.customerCardService
      .getCommunicationChannelApi()
      .subscribe((data: any) => {
        this.cstSourceList = data.map((e: any) => ({
          id: e.value,
          value: e.code,
        }));
        this.ref.detectChanges();
      });

    //this.emailService.getEmails(0, 100);
    this.subscription = this.customerCardService
      .getUserDetails()
      .subscribe((data: any) => {
        this.assignedToList = data.map((e: any) => ({
          id: e.userId,
          value: e.email,
        }));
        this.ref.detectChanges();
      });

    this.customerServiceFilterOptions = {
      searchQuery: '',
      fromDateCreated: null,
      toDateCreated: null,
      fromDateModified: null,
      toDateModified: null,
      communicationChannelId: null,
      assignedToId: null,
      category: null,
      followUpResponse: null,
      followUpStatus: null,
    };
  }

  onChangeTicketType(event: Event) {
    this.selectedTicketType = event;
  }
  onChangeCstSource(event: Event) {
    this.selectedCstSource = event;
  }
  onChangeAssignedTo(event: Event) {
    this.selectedAssignedTo = event;
  }

  onCancel(): void {
    this.router.navigate([
      `${ApplicationRoutes.CustomerService}/${ApplicationRoutes.Filter}`,
    ]);

    this.layoutService.closeRightSideNav();
  }

  filter() {
    this.numberOfCustomerServiceAppliedFilters = 0;

    this.customerServiceFilterOptions = {
      searchQuery: '',
      fromDateCreated: this.fromDateCreated,
      toDateCreated: this.toDateCreated,
      fromDateModified: this.fromDateModified,
      toDateModified: this.toDateModified,
      communicationChannelId: this.selectedCstSource,
      assignedToId: this.selectedAssignedTo,
      followUpResponse: null,
      followUpStatus: null,
      category: this.selectedTicketType,
    };

    this.customerCardService.filterCustomerServiceTickets(
      this.customerServiceFilterOptions
    );

    this.customerServiceTicketsRepository.updateFilterOptions(
      this.customerServiceFilterOptions
    );

    Object.keys(this.customerServiceFilterOptions).forEach((key) => {
      const value = this.customerServiceFilterOptions[key];
      if (value !== null && value !== '') {
        this.numberOfCustomerServiceAppliedFilters++;
      }
    });

    this.customerServiceTicketsRepository.updateNumberOfAppliedFilters(
      this.numberOfCustomerServiceAppliedFilters
    );

    this.onCancel();
  }

  onClearFilters() {
    this.fromDateCreated = null;
    this.toDateCreated = null;
    this.toDateModified = null;
    this.fromDateModified = null;
    this.selectedCstSource = null;
    this.selectedTicketType = null;
    this.selectedAssignedTo = null;

    this.customerServiceFilterOptions = {
      searchQuery: '',
      fromDateCreated: this.fromDateCreated,
      toDateCreated: this.toDateCreated,
      fromDateModified: this.fromDateModified,
      toDateModified: this.toDateModified,
      communicationChannelId: this.selectedCstSource,
      assignedToId: this.selectedAssignedTo,
      category: this.selectedTicketType,
      followUpResponse: null,
      followUpStatus: null,
    };

    this.customerServiceTicketsRepository.updateFilterOptions(
      this.customerServiceFilterOptions
    );

    this.numberOfCustomerServiceAppliedFilters = 0;
    this.customerServiceTicketsRepository.updateNumberOfAppliedFilters(
      this.numberOfCustomerServiceAppliedFilters
    );
  }
}
