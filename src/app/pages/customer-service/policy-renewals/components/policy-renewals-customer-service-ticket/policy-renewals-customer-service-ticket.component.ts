import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SignalrService } from '../../services/signalr.service';

@Component({
  selector: 'app-policy-renewals-customer-service-ticket',
  templateUrl: './policy-renewals-customer-service-ticket.component.html',
  styleUrls: ['./policy-renewals-customer-service-ticket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PolicyRenewalsCustomerServiceTicketComponent implements OnInit, OnDestroy {
  pageFlag: string = 'first';

  constructor(public dialogRef: MatDialogRef<PolicyRenewalsCustomerServiceTicketComponent>,
    public signalRService: SignalrService) { }

  ngOnInit(): void {
    this.signalRService.startConnection();
  }

  ngOnDestroy(): void {
    this.signalRService.stopConnection();
  }

  nextPage() {
    this.pageFlag = 'next';
  }

  backToFirstPage() {
    this.pageFlag = 'first';
  }

}
