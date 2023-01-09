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
      name: 'unAssigned',
    },
  ];

  FollowUpStatus: BaseListItem[] = [
    {
      id: '1',
      name: 'Follow Up',
    },
    {
      id: '2',
      name: 'In Process',
    },
    {
      id: '3',
      name: 'Processed',
    },
    {
      id: '4',
      name: 'Renewal Approved',
    },
    {
      id: '5',
      name: 'Closed',
    },
  ];

  constructor(
    public policyCardService: PolicyCardService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

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
