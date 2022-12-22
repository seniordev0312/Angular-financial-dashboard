import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { KYCDocumentTypeService } from '@root/pages/customer-service/policy-renewals/services/kyc-documents-type.service';
import { kycDocumentsType$ } from '@root/pages/customer-service/policy-renewals/store/kyc-documents-type.store';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { ContactFormService } from '../../services/contact-form.service';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactViewComponent extends BaseComponent implements OnInit {

  data: any = [];

  constructor(
    private kYCDocumentTypeService: KYCDocumentTypeService,
    private contactFormService: ContactFormService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  kycDocumentsTypeList: any = [];


  onSelect(data: any, id: any): void {

    const message = this.data.filter((e: any) => e.id === id)[0]
    console.log(data);
    console.log(message);
    console.log(message.chatId);
    console.log(message.id);
    this.kYCDocumentTypeService.extractDocument({
      chatId: message.chatId,
      messageId: message.id,
      templateReferenceId: data
    })

  }

  updateData(data: any) {
    this.data.push(data);
    console.log(this.data);
    this.contactFormService.updateChat(data);
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.kYCDocumentTypeService.extractDocumentSubject$.subscribe((data: any) => {
        console.log(data);
      })
    )
    this.subscriptions.add(
      kycDocumentsType$.subscribe((data) => {
        console.log(data);
        this.kycDocumentsTypeList = data;
      })
    );
    this.kYCDocumentTypeService.getKYCDocumentType(0, 1000);
  }
}