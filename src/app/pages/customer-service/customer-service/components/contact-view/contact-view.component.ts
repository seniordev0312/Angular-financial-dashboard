import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { CalculatorFormGroupService } from '../../services/calculator-form-group.service';
import { ContactFormService } from '../../services/contact-form.service';
import { KYCDocumentTypeService } from '../../services/kyc-documents-type.service';
import {
  kycDocumentsType$,
  ticketData$,
} from '../../store/kyc-documents-type.store';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactViewComponent extends BaseComponent implements OnInit {
  JSONData: any;
  data: any = [];
  chatId: any;
  spinner = false;
  kycDocumentsTypeList: any = [];
  chatMenuOptions: string[] = [
    'Medical Insurance ADALs',
    'Travel Insurance ADALs',
    'Motor Insurance ADALs',
    'Group Medical Insurance ADALs',
    'Customer Insurance ADALs',
  ];
  imageProcessingOptions: string[] = [
    'Process as Civil Extract',
    'Process as Passport',
    'Process as Civil ID',
    'Process as Driving License',
    'Store as Car Picture',
    'Store as Vehicle Registration',
  ];

  chatMenuClicked: boolean = false;
  calculatorClicked: boolean = false;
  imageProcessingClicked: boolean = false;
  locationProcessingClicked: boolean = false;

  selectedImageForProcessing: number = -1;
  selectedLocationForProcessing: number = -1;
  selectedPricingCalculateBtn: number = -1;
  minSumInsured: number = 24500;
  maxSumInsured: number = 28500;

  fgCar: FormGroup;

  messageHistoryList: any[] = [];

  @Input() isDepartmentChat: boolean = false;
  @Input() chosenCategoryInfo: any;
  @Input() canShowCalculator: any;

  constructor(
    private kYCDocumentTypeService: KYCDocumentTypeService,
    private contactFormService: ContactFormService,
    private cdr: ChangeDetectorRef,
    private calculatorFormGroupService: CalculatorFormGroupService
  ) {
    super();
  }

  keys(data: any): Array<string> {
    return Object.keys(data);
  }

  ngOnInit(): void {
    this.JSONData =
      '{"idProcessed":"f471bbd5-7b5b-4320-8850-39c09771d7d8","templateDescription":"The New Driving License of the Lebanese People","dateProcessed":"2022-12-22T02:16:10.7097883Z","componentList":[{"componentName":"Face","componentValue":"https://storagetestassentify.blob.core.windows.net/aperture-temp/f750fb1f-ec10-48cd-a6b0-a6972f0adaea.jpg"},{"componentName":"Ghost Image","componentValue":"https://storagetestassentify.blob.core.windows.net/aperture-temp/ce545d0f-6883-4da6-bfca-23a9178038b3.jpg"},{"componentName":"Signature","componentValue":"https://storagetestassentify.blob.core.windows.net/aperture-temp/0fe3a4b5-e85d-421c-9c76-3b865d7011f0.jpg"},{"componentName":"Last Name - Arabic","componentValue":"السروجي"},{"componentName":"Last Name","componentValue":"ALSROUJI"},{"componentName":"First Name - Arabic","componentValue":"محمد"},{"componentName":"First Name","componentValue":"MOHAMAD"},{"componentName":"DoB","componentValue":"09/06/1984"},{"componentName":"Location of Birth","componentValue":"سات"},{"componentName":"Issuance Date","componentValue":"02/08/2017"},{"componentName":"Expiry Date","componentValue":"09/06/2034"},{"componentName":"Nationality AR","componentValue":"نبناتية"},{"componentName":"Nationality EN","componentValue":"LEBANESE"},{"componentName":"Father’s Name","componentValue":"سامي"},{"componentName":"Issuance Place","componentValue":"بيروت"},{"componentName":"Gender","componentValue":""},{"componentName":"Driving License Number","componentValue":"1627830"},{"componentName":"Blood Type","componentValue":"O+"},{"componentName":"Mother’s Name","componentValue":"ليلى"},{"componentName":"Driving Category","componentValue":"B"},{"componentName":"ExtractedImage","componentValue":"https://storagetestassentify.blob.core.windows.net/aperture-temp/8defe46a-e813-4d33-922e-da067a1b7119.jpg"}]}';
    this.JSONData = JSON.parse(this.JSONData).componentList;

    if (!this.isDepartmentChat) {
      this.subscriptions.add(
        this.kYCDocumentTypeService.extractDocumentSubject$.subscribe(
          (data: any) => {
            console.log('extractDocumentSubject', data);
            this.spinner = false;
          }
        )
      );
    }

    this.subscriptions.add(
      ticketData$.subscribe((data) => {
        this.chatId = data.chatId;
      })
    );

    if (!this.isDepartmentChat) {
      this.subscriptions.add(
        kycDocumentsType$.subscribe((data) => {
          this.kycDocumentsTypeList = data;
        })
      );

      this.kYCDocumentTypeService.getKYCDocumentType(0, 1000);
    }

    this.subscriptions.add(
      this.contactFormService.getMessageHistory(424).subscribe((data: any) => { 
        this.messageHistoryList = data;
        this.cdr.detectChanges();
        console.log('message history', this.messageHistoryList);
      })
    );

  }

  onSelect(data: any, id: any): void {
    const message = this.data.filter((e: any) => e.id === id)[0];
    // console.log(data);
    // console.log(message);
    // console.log(message.chatId);
    // console.log(message.id);
    this.spinner = true;
    this.kYCDocumentTypeService.extractDocument({
      chatId: this.chatId,
      messageId: message.id,
      templateReferenceId: data,
    });
  }

  updateData(data: any) {
    if (data) {
      if (data.type === 2) {
        data.body = JSON.parse(data.body);
        this.data.push(data);
        this.contactFormService.updateChat(data);
        this.cdr.detectChanges();
      } else {
        this.data.push(data);
        this.contactFormService.updateChat(data);
        this.cdr.detectChanges();
      }
    }
  }

  containsHttp(data: string) {
    return data.includes('http');
  }

  onClickAssentifyLogo() {
    this.chatMenuClicked = !this.chatMenuClicked;
    if (this.chatMenuClicked) this.calculatorClicked = false;
  }

  onClickCalculator() {
    this.fgCar = this.calculatorFormGroupService.getFormGroup();

    this.calculatorClicked = !this.calculatorClicked;
    if (this.calculatorClicked) this.chatMenuClicked = false;
  }

  getFormControl(key: string): FormControl {
    return this.fgCar.controls[key] as FormControl;
  }

  onClickPricingBtn(btnValue: number) {
    this.selectedPricingCalculateBtn = btnValue;
  }

  onOpenProcessImage(id: number) {
    this.imageProcessingClicked = !this.imageProcessingClicked;
    this.selectedImageForProcessing = id;
  }

  onOpenProcessLocation(id: number) {
    this.locationProcessingClicked = !this.locationProcessingClicked;
    this.selectedLocationForProcessing = id;
  }
}
