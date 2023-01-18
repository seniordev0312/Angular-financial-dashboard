import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { PolicyCardService } from '../../services/policy-card.service';
import { Router } from '@angular/router';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

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

  fromDateCreated: Date;
  toDateCreated: Date;
  fromDateModified: Date;
  toDateModified: Date;
  policyStatus: string = '';

  AssignedStatus: BaseListItem[] = [
    {
      id: '1',
      value: 'unAssigned',
    },
  ];

  FollowUpStatus: BaseListItem[] = [
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
  ];

  constructor(
    public policyCardService: PolicyCardService,
    private ref: ChangeDetectorRef,
    private layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit(): void {}

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
    };
    this.policyCardService
      .filterPolicyRenewalTickets(filterOption)
      .subscribe((data: any) => {
        this.filteringArray = data;
        this.filteringArrayChange.emit(this.filteringArray);
        this.ref.detectChanges();
      });
  }
}
