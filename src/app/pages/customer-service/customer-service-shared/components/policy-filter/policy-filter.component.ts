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
  fromDateCreated: Date;
  toDateCreated: Date;
  fromDateModified: Date;
  toDateModified: Date;
  policyStatus: string = '';

  
  subscription: Subscription;

  followUpResponsivenessList: any;
  followUpResponsivenessListControl: FormControl = new FormControl({ id: 0, value: null });
  selectedFollowUpResponsiveness: any;

  followUpStatusList: any;
  followUpStatusListControl: FormControl = new FormControl({ id: 0, value: null });
  selectedFollowUpStatus: any;

  assignedToListControl: FormControl = new FormControl({ id: -1, value: null });
  assignedToList: any;
  selectedAssignedTo: any;



 /*  AssignedStatus: BaseListItem[] = [
    {
      id: '1',
      value: 'unAssigned',
    },
  ]; */
    
  
  // FollowUpStatus: BaseListItem[] = [
  //   {
  //     id: '1',
  //     value: 'Follow Up',
  //   },
  //   {
  //     id: '2',
  //     value: 'In Process',
  //   },
  //   {
  //     id: '3',
  //     value: 'Processed',
  //   },
  //   {
  //     id: '4',
  //     value: 'Renewal Approved',
  //   },
  //   {
  //     id: '5',
  //     value: 'Closed',
  //   },
  // ];

  constructor(
    public policyCardService: PolicyCardService,
    public customerCardService: CustomerCardService,
    private activeRoute: ActivatedRoute,
    private layoutService: LayoutService,
    private router: Router,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params) => {
      this.ticketType = params.get('ticketType');
    });

    this.subscription = this.policyCardService
      .getFollowUpResponsivenessApi()
      .subscribe((data: any) => {
        this.followUpResponsivenessList=data.map((e:any) => ({ id: e.value, value: e.code }));
        this.ref.detectChanges();
      });
    
    this.subscription = this.policyCardService
      .getFollowUpStatusApi()
      .subscribe((data: any) => {
        this.followUpStatusList=data.map((e:any) => ({ id: e.value, value: e.code }));
        this.ref.detectChanges();
      });
    
    this.subscription = this.customerCardService
      .getUserDetails()
      .subscribe((data: any) => {
        this.assignedToList = data.map((e:any) => ({ id: e.userId, value: e.email, }));
        this.ref.detectChanges();
      });
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
    const filterOption = {
      searchQuery: '',
      fromDateCreated: this.fromDateCreated,
      toDateCreated: this.toDateCreated,
      fromDateModified: this.fromDateModified,
      toDateModified: this.toDateModified,
      assignedToId: this.selectedAssignedTo,
      followUpResponse: this.selectedFollowUpResponsiveness,
      followUpStatus:this.selectedFollowUpStatus
    };

    this.ticketType == 'policyRenewals'
      ? this.policyCardService.filterPolicyRenewalTickets(filterOption)
      : this.customerCardService.filterCustomerServiceTickets(filterOption);
  }

  onClearFilters() {
    this.fromDateCreated = null;
    this.toDateCreated = null; 
    this.toDateModified = null; 
    this.fromDateModified = null; 
    this.selectedFollowUpStatus = null;
    this.selectedFollowUpResponsiveness = null;
    this.selectedAssignedTo = null;
  }
}
