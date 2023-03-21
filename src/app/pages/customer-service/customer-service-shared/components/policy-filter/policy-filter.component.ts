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
import {
  numberOfPolicyRenewalAppliedFilters$,
  policyRenewalFilterOptions$,
} from '@root/pages/customer-service/policy-renewals/store/policy-renewals-tickets.store';
import { PolicyRenewalsTicketsRepository } from '@root/pages/customer-service/policy-renewals/store/policy-renewals-tickets.repository';

@Component({
  selector: 'app-policy-filter',
  templateUrl: './policy-filter.component.html',
  styleUrls: ['./policy-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyFilterComponent implements OnInit {
  @Input() policyFilterDrawer: any;
  @Input() filteringArray: any;
  @Output() filteringArrayChange = new EventEmitter<any>();
  ticketType: any;
  fromDateCreated: Date = null;
  toDateCreated: Date = null;
  fromDateModified: Date = null;
  toDateModified: Date = null;
  policyStatus: string = '';

  subscription: Subscription;

  followUpResponsivenessList: any;
  followUpResponsivenessListControl: FormControl = new FormControl({
    id: 0,
    value: null,
  });
  selectedFollowUpResponsiveness: any = null;

  followUpStatusList: any;
  followUpStatusListControl: FormControl = new FormControl({
    id: 0,
    value: null,
  });
  selectedFollowUpStatus: any = null;

  assignedToListControl: FormControl = new FormControl({ id: -1, value: null });
  assignedToList: any;
  selectedAssignedTo: any = null;

  public policyRenewalFilterOptions: any = {};
  public numberOfPolicyRenewalAppliedFilters: number = 0;

  constructor(
    public policyCardService: PolicyCardService,
    public customerCardService: CustomerCardService,
    private activeRoute: ActivatedRoute,
    private layoutService: LayoutService,
    private router: Router,
    private ref: ChangeDetectorRef,
    private policyRenewalsTicketsRepository: PolicyRenewalsTicketsRepository
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params) => {
      this.ticketType = params.get('ticketType');
    });

    this.subscription = policyRenewalFilterOptions$.subscribe((data: any) => {
      this.policyRenewalFilterOptions = data;
      this.selectedAssignedTo = this.policyRenewalFilterOptions.assignedToId;
      this.ref.detectChanges();
    });

    this.subscription = this.policyCardService
      .getFollowUpResponsivenessApi()
      .subscribe((data: any) => {
        this.followUpResponsivenessList = data.map((e: any) => ({
          id: e.value,
          value: e.code,
        }));
        this.ref.detectChanges();
      });

    this.subscription = this.policyCardService
      .getFollowUpStatusApi()
      .subscribe((data: any) => {
        this.followUpStatusList = data.map((e: any) => ({
          id: e.value,
          value: e.code,
        }));
        this.ref.detectChanges();
      });

    this.subscription = this.customerCardService
      .getUserDetails()
      .subscribe((data: any) => {
        this.assignedToList = data.map((e: any) => ({
          id: e.userId,
          value: e.email,
        }));
        this.ref.detectChanges();
      });

    this.subscription = numberOfPolicyRenewalAppliedFilters$.subscribe(
      (data: any) => {
        this.numberOfPolicyRenewalAppliedFilters = data;
        this.ref.detectChanges();
      }
    );

    this.policyRenewalFilterOptions = {
      searchQuery: '',
      fromDateCreated: null,
      toDateCreated: null,
      fromDateModified: null,
      toDateModified: null,
      communicationChannelId: null,
      assignedToId: null,
      category: null,
    };
  }

  onChangeFollowUpStatus(event: Event) {
    this.selectedFollowUpStatus = event;
  }
  onChangeFollowUpResponsiveness(event: Event) {
    this.selectedFollowUpResponsiveness = event;
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
    this.numberOfPolicyRenewalAppliedFilters = 0;

    this.policyRenewalFilterOptions = {
      searchQuery: '',
      fromDateCreated: this.fromDateCreated,
      toDateCreated: this.toDateCreated,
      fromDateModified: this.fromDateModified,
      toDateModified: this.toDateModified,
      assignedToId: this.selectedAssignedTo,
      followUpResponse: this.selectedFollowUpResponsiveness,
      followUpStatus: this.selectedFollowUpStatus,
    };

    this.policyCardService.filterPolicyRenewalTickets(
      this.policyRenewalFilterOptions
    );

    this.policyRenewalsTicketsRepository.updateFilterOptions(
      this.policyRenewalFilterOptions
    );

    Object.keys(this.policyRenewalFilterOptions).forEach((key) => {
      const value = this.policyRenewalFilterOptions[key];
      if (value !== null && value !== '') {
        this.numberOfPolicyRenewalAppliedFilters++;
      }
    });

    this.policyRenewalsTicketsRepository.updateNumberOfAppliedFilters(
      this.numberOfPolicyRenewalAppliedFilters
    );

    this.onCancel();
  }

  onClearFilters() {
    this.fromDateCreated = null;
    this.toDateCreated = null;
    this.toDateModified = null;
    this.fromDateModified = null;
    this.selectedFollowUpStatus = null;
    this.selectedFollowUpResponsiveness = null;
    this.selectedAssignedTo = null;

    this.numberOfPolicyRenewalAppliedFilters = 0;
    this.policyRenewalsTicketsRepository.updateNumberOfAppliedFilters(
      this.numberOfPolicyRenewalAppliedFilters
    );
  }
}
