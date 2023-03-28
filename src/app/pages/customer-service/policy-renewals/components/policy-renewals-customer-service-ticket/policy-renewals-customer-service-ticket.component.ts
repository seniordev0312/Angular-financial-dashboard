import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Inject,
  ChangeDetectorRef
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

  exportHistoryData: any;//object sent to the edit-history from history-list when editing

  statusList: BaseListItem[] = [];

  selectedTicketStatus: FormControl = new FormControl({ id: -1, value: '' });

  constructor(
    public dialogRef: MatDialogRef<PolicyRenewalsCustomerServiceTicketComponent>,
    private policyCardService: PolicyCardService,
    private ref: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }

  ngOnInit(): void {
    this.policyCardService.getFollowUpStatusApi().subscribe((data: any) => {
      this.statusList = data.map((e: any) => ({
        id: e.value,
        value: e.code,
      }));
      this.ref.detectChanges();
    });
  }

  nextPage() {
    //flag = -1 because it's adding a new communication
    this.communicationAction = -1;
    this.pageFlag = 'next';
  }

  openNote() {
    this.noteSectionFlag = !this.noteSectionFlag;
  }

  onChangeTicketStatus(event: Event) {
    this.data.dataKey.status = event;

    this.policyCardService.updatePolicyRenewalTickets(this.data.dataKey);
  }

  onSubmitNote(event: Event) {
    let body: any = {
      note: event,
      noteSpecified: true,
    };
    this.policyCardService.updateCustomServiceTicketDetails(
      this.data.dataKey.id,
      body
    );
    this.noteSectionFlag = false;
  }
}
