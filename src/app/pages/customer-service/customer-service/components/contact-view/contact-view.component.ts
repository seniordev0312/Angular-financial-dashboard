import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { KYCDocumentTypeService } from '@root/pages/customer-service/policy-renewals/services/kyc-documents-type.service';
import { kycDocumentsType$, ticketData$ } from '@root/pages/customer-service/policy-renewals/store/kyc-documents-type.store';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { ContactFormService } from '../../services/contact-form.service';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactViewComponent extends BaseComponent implements OnInit {

  JSONData: any;
  data: any = [];
  chatId: any;
  spinner = false;

  constructor(
    private kYCDocumentTypeService: KYCDocumentTypeService,
    private contactFormService: ContactFormService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  kycDocumentsTypeList: any = [];

  keys(data: any): Array<string> {
    return Object.keys(data);
  }
  onSelect(data: any, id: any): void {
    const message = this.data.filter((e: any) => e.id === id)[0]
    console.log(data);
    console.log(message);
    console.log(message.chatId);
    console.log(message.id);
    this.spinner = true;
    this.kYCDocumentTypeService.extractDocument({
      chatId: this.chatId,
      messageId: message.id,
      templateReferenceId: data
    });
  }

  updateData(data: any) {
    if (data.type === 2) {
      data.body = JSON.parse(data.body);
      console.log(this.data);
      this.data.push(data);
      this.contactFormService.updateChat(data);
      this.cdr.detectChanges();
    } else {
      this.data.push(data);
      console.log(this.data);
      this.contactFormService.updateChat(data);
      this.cdr.detectChanges();
    }
  }

  containsHttp(data: string) {
    return data.includes('http');
  }

  ngOnInit(): void {
    this.JSONData = "{\"idProcessed\":\"f471bbd5-7b5b-4320-8850-39c09771d7d8\",\"templateDescription\":\"The New Driving License of the Lebanese People\",\"dateProcessed\":\"2022-12-22T02:16:10.7097883Z\",\"componentList\":[{\"componentName\":\"Face\",\"componentValue\":\"https://storagetestassentify.blob.core.windows.net/aperture-temp/f750fb1f-ec10-48cd-a6b0-a6972f0adaea.jpg\"},{\"componentName\":\"Ghost Image\",\"componentValue\":\"https://storagetestassentify.blob.core.windows.net/aperture-temp/ce545d0f-6883-4da6-bfca-23a9178038b3.jpg\"},{\"componentName\":\"Signature\",\"componentValue\":\"https://storagetestassentify.blob.core.windows.net/aperture-temp/0fe3a4b5-e85d-421c-9c76-3b865d7011f0.jpg\"},{\"componentName\":\"Last Name - Arabic\",\"componentValue\":\"السروجي\"},{\"componentName\":\"Last Name\",\"componentValue\":\"ALSROUJI\"},{\"componentName\":\"First Name - Arabic\",\"componentValue\":\"محمد\"},{\"componentName\":\"First Name\",\"componentValue\":\"MOHAMAD\"},{\"componentName\":\"DoB\",\"componentValue\":\"09/06/1984\"},{\"componentName\":\"Location of Birth\",\"componentValue\":\"سات\"},{\"componentName\":\"Issuance Date\",\"componentValue\":\"02/08/2017\"},{\"componentName\":\"Expiry Date\",\"componentValue\":\"09/06/2034\"},{\"componentName\":\"Nationality AR\",\"componentValue\":\"نبناتية\"},{\"componentName\":\"Nationality EN\",\"componentValue\":\"LEBANESE\"},{\"componentName\":\"Father’s Name\",\"componentValue\":\"سامي\"},{\"componentName\":\"Issuance Place\",\"componentValue\":\"بيروت\"},{\"componentName\":\"Gender\",\"componentValue\":\"\"},{\"componentName\":\"Driving License Number\",\"componentValue\":\"1627830\"},{\"componentName\":\"Blood Type\",\"componentValue\":\"O+\"},{\"componentName\":\"Mother’s Name\",\"componentValue\":\"ليلى\"},{\"componentName\":\"Driving Category\",\"componentValue\":\"B\"},{\"componentName\":\"ExtractedImage\",\"componentValue\":\"https://storagetestassentify.blob.core.windows.net/aperture-temp/8defe46a-e813-4d33-922e-da067a1b7119.jpg\"}]}";
    this.JSONData = JSON.parse(this.JSONData).componentList;
    console.log(this.JSONData);
    this.subscriptions.add(
      this.kYCDocumentTypeService.extractDocumentSubject$.subscribe((data: any) => {
        console.log('extractDocumentSubject', data);
        this.spinner = false;
      })
    )

    this.subscriptions.add(
      ticketData$.subscribe((data) => {
        console.log('ticketData', data);
        this.chatId = data.chatId;
      })
    )

    this.subscriptions.add(
      kycDocumentsType$.subscribe((data) => {
        this.kycDocumentsTypeList = data;
      })
    );
    this.kYCDocumentTypeService.getKYCDocumentType(0, 1000);
  }
}