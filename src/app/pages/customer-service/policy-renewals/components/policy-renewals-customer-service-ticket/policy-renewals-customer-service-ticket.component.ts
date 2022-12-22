import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactViewComponent } from '@root/pages/customer-service/customer-service/components/contact-view/contact-view.component';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { KYCDocumentTypeService } from '../../services/kyc-documents-type.service';
import { SignalRService } from '../../services/signalr.service';

@Component({
  selector: 'app-policy-renewals-customer-service-ticket',
  templateUrl: './policy-renewals-customer-service-ticket.component.html',
  styleUrls: ['./policy-renewals-customer-service-ticket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PolicyRenewalsCustomerServiceTicketComponent extends BaseComponent implements OnInit, OnDestroy {
  pageFlag: string = 'first';

  @ViewChild(ContactViewComponent)
  contactViewComponent: ContactViewComponent;

  data: any = [];
  constructor(
    public dialogRef: MatDialogRef<PolicyRenewalsCustomerServiceTicketComponent>,
    public signalRService: SignalRService,
    private kYCDocumentTypeService: KYCDocumentTypeService
  ) {
    super();
  }

  ngOnInit(): void {
    this.kYCDocumentTypeService.getKYCDocumentType(0, 1000);
    this.signalRService.init(187);

    this.subscriptions.add(
      this.signalRService.signalRSubject$.subscribe((data: any) => {
        this.contactViewComponent.updateData(data);
      })
    );
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
