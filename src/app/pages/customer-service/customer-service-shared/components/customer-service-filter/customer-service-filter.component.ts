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
  fromDateCreated: Date;
  toDateCreated: Date;
  fromDateModified: Date;
  toDateModified: Date;

  subscription: Subscription;
  //cstSource: string = '';
  ticketTypeList: any;
  ticketTypeListControl: FormControl = new FormControl({ id: -1, value: '' });
  selectedTicketType: any;

  cstSourceList: any;
  cstSourceListControl: FormControl = new FormControl({ id: -1, value: '' });
  selectedCstSource: any;
  
  assignedToListControl: FormControl = new FormControl({ id: -1, value: '' });
  assignedToList: any;
  selectedAssignedTo: any;


  /* AssignedStatus: BaseListItem[] = [
    {
      id: '1',
      value: 'unAssigned',
    },
  ]; */

  /* FollowUpStatus: BaseListItem[] = [
    {
      id: '1',
      value: 'Follow Up',
    },
    {
      id: '2',
      value: 'In Process',
    },
    {
      id: '3',
      value: 'Processed',
    },
    {
      id: '4',
      value: 'Renewal Approved',
    },
    {
      id: '5',
      value: 'Closed',
    },
  ]; */

  /* CstSourceList: BaseListItem[] = [
     {
      id: '1',
      value: 'Email',
    },
    {
      id: '2',
      value: 'Whatsapp',
    },
  ] */

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

    this.subscription = this.customerCardService
      .getCustomerServiceTicketTypeApi()
      .subscribe((data: any) => {
        this.ticketTypeList = data.map((e:any) => ({ id: e.id, value: e.name }));
        this.ref.detectChanges();
      });
    
    this.subscription = this.customerCardService
      .getCommunicationChannelApi()
      .subscribe((data: any) => {
        this.cstSourceList = data.map((e:any) => ({ id: e.value, value: e.code }));
        this.ref.detectChanges();
      });
    
    //this.emailService.getEmails(0, 100);
    this.subscription = this.customerCardService
      .getUserDetails()
      .subscribe((data: any) => {
        this.assignedToList = data.map((e:any) => ({ id: e.userId, value: e.email, }));
        console.log("AssignedStatus",this.assignedToList)
        this.ref.detectChanges();
      });
  }

  onChangeTicketType(event: Event) {
    this.selectedTicketType = event;
    console.log(this.selectedTicketType)
  }
  onChangeCstSource(event: Event) {
    this.selectedCstSource = event;
    console.log(this.selectedCstSource);
  }
  onChangeAssignedTo(event: Event) {
    this.selectedAssignedTo = event;
    console.log(this.selectedAssignedTo);
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
      communicationChannelId: this.selectedCstSource,
      assignedToId:this.selectedAssignedTo
    };

    this.ticketType == 'customerService'
      ?
      this.customerCardService.filterCustomerServiceTickets(filterOption)
      : this.policyCardService.filterPolicyRenewalTickets(filterOption);
  }

  onClearFilters() {
    this.fromDateCreated = null;
    this.toDateCreated = null; 
    this.toDateModified = null; 
    this.fromDateCreated = null; 
    //this.cstSource = '';
    this.ticketType = '';
    this.selectedCstSource = -1;
    this.selectedTicketType = -1;
    this.selectedAssignedTo = -1;
    
  }
}
