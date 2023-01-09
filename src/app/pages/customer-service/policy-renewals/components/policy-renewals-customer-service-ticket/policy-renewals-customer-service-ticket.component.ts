import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Inject,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseListItem } from '@root/shared/models/base-list-item.model';

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
  status: BaseListItem[];

  constructor(
    public dialogRef: MatDialogRef<PolicyRenewalsCustomerServiceTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    let statusValue: string;
    statusValue = this.data.dataKey.status == 0 ? 'Follow up' : '';
    statusValue = this.data.dataKey.status == 1 ? 'In Process' : '';
    statusValue = this.data.dataKey.status == 2 ? 'Processed' : '';
    statusValue = this.data.dataKey.status == 3 ? 'Approved' : '';
    statusValue = this.data.dataKey.status == 4 ? 'Closed' : '';
    this.status = [{ id: '0', name: statusValue }];
  }

  nextPage() {
    this.pageFlag = 'next';
  }

  openNote() {
    this.noteSectionFlag = !this.noteSectionFlag;
  }
}
