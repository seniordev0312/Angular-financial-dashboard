import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-policy-renewals-customer-service-ticket',
  templateUrl: './policy-renewals-customer-service-ticket.component.html',
  styleUrls: ['./policy-renewals-customer-service-ticket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PolicyRenewalsCustomerServiceTicketComponent implements OnInit {
  pageFlag: string = 'first';
  constructor(public dialogRef: MatDialogRef<PolicyRenewalsCustomerServiceTicketComponent>,) { }

  ngOnInit(): void {


  }

  nextPage() {
    this.pageFlag = 'next';
  }

  backToFirstPage() {
    this.pageFlag = 'first';
  }

}
