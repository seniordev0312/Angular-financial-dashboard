import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { KYCDocumentTypeService } from '@root/pages/customer-service/policy-renewals/services/kyc-documents-type.service';
import { kycDocumentsType$ } from '@root/pages/customer-service/policy-renewals/store/kyc-documents-type.store';
import { BaseComponent } from '@root/shared/components/base-component/base-component';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactViewComponent extends BaseComponent implements OnInit {

  @Input() data: any
  constructor(
    private kYCDocumentTypeService: KYCDocumentTypeService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  kycDocumentsTypeList: any = [];


  onSelect(data: any): void {
    console.log(data);
  }

  updateData() {
    console.log(this.data);
    this.cdr.detectChanges()
  }

  ngOnInit(): void {
    this.subscriptions.add(
      kycDocumentsType$.subscribe((data) => {
        console.log(data);
        this.kycDocumentsTypeList = data;
      })
    );
    this.kYCDocumentTypeService.getKYCDocumentType(0, 1000);
  }
}