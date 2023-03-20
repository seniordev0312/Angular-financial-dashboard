import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Inject,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { PolicyCardService } from '../../services/policy-card.service';

@Component({
  selector: 'app-policy-renewals-customer-service-ticket',
  templateUrl: './policy-renewals-customer-service-ticket.component.html',
  styleUrls: ['./policy-renewals-customer-service-ticket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyRenewalsCustomerServiceTicketComponent implements OnInit {
  pageFlag: string = 'first';
  // flag for edit or create
  communicationAction: number = -1;
  noteSectionFlag: boolean = false;
  statusList: BaseListItem[] = [
    { id: 0, value: 'Policy Renewal Followup' },
    { id: 1, value: 'In Process' },
    { id: 2, value: 'Processed (Renewal Issued)' },
    { id: 3, value: 'Renewal Approved' },
    { id: 4, value: 'Closed (No Renewal)' },
  ];
  selectedTicketStatus: FormControl = new FormControl({ id: -1, value: '' });

  constructor(
    public dialogRef: MatDialogRef<PolicyRenewalsCustomerServiceTicketComponent>,
    private policyCardService: PolicyCardService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.selectedTicketStatus.setValue(
      this.getTicketStatus(this.data.dataKey.status)
    );
  }

  getTicketStatus(statusId: number): BaseListItem {
    if (statusId == 0) return { id: 0, value: 'Created/Received Queue' };
    else if (statusId == 1) return { id: 1, value: 'In Process' };
    else if (statusId == 2) return { id: 2, value: 'Processed' };
    else if (statusId == 3) return { id: 3, value: 'Resolved' };
    else if (statusId == 4) return { id: 4, value: 'Closed' };
    else return null;
  }

  nextPage() {
    this.pageFlag = 'next';
  }

  openNote() {
    this.noteSectionFlag = !this.noteSectionFlag;
  }

  onChangeTicketStatus(event: Event) {
    this.data.dataKey.status = event;

    this.policyCardService.updatePolicyRenewalTickets(this.data.dataKey);
  }
}
