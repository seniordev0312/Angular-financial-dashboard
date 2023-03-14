import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CustomerCardService } from '../../services/customer-card.service';
import { isSpinning$ } from '@root/shared/store/shared.store';
import { Observable } from 'rxjs';
import { SignalRService } from '../../services/signalr.service';
import { ContactViewComponent } from '../contact-view/contact-view.component';
import { KYCDocumentTypeService } from '../../services/kyc-documents-type.service';
import { FormControl, Validators } from '@angular/forms';
import { ContactFormService } from '../../services/contact-form.service';
import { BaseListItem } from '@root/shared/models/base-list-item.model';

@Component({
  selector: 'app-customer-service-ticket',
  templateUrl: './customer-service-ticket.component.html',
  styleUrls: ['./customer-service-ticket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerServiceTicketComponent implements OnInit {
  isSpinning$: Observable<boolean>;
  subscription: Subscription;
  // state variable
  buttonAfterClickStyle: string = 'white bg-[#005F83]';
  noteSectionFlag: boolean = false;
  businessSectionFlag: boolean = false;
  productSectionFlag: boolean = false;
  initialSectionFlag: boolean = false;
  typeSectionFlag: boolean = false;
  locationSectionFlag: boolean = false;
  priceValue: string = ' ';
  disableButton: boolean = false;
  disableButtonClass: string = '';
  emergencyInitialSectionFlag: boolean = false;
  salesFlowFlag: boolean = false;
  emergencyFlowFlag: boolean = false;
  otherFlowFlag: boolean = false;
  complaintFlowFlag: boolean = false;
  pendingCardFlag: boolean = false;
  isShowAppField = false;
  isLoading = false;
  canShowCalculator = false;
  ticketId: number = 0;
  categories: { id: number; name: string }[] = [];
  businesses: { id: number; name: string }[] = [];
  products: { id: number; productCode: string; productDescription: string }[] =
    [];
  complaintCategories: any[] = [];
  requiredData: any;
  emergencyTypes: { id: number; name: string }[] = [];
  emergencyInitiateItems: {
    id: number;
    name: string;
    emergencyTypeId: number;
  }[] = [];
  isBlue: boolean = false;
  choosedButtons: {
    category: number;
    complaintCategory: number;
    business: number;
    product: number;
    emergencyType: number;
    initiate: number[];
  } = {
    category: 0,
    complaintCategory: 0,
    business: 0,
    product: 0,
    emergencyType: 0,
    initiate: [],
  };
  ticketStatus: BaseListItem[] = [
    { id: 0, value: 'Created/Received Queue' },
    { id: 1, value: 'In Process' },
    { id: 2, value: 'Processed' },
    { id: 3, value: 'Resolved' },
    { id: 4, value: 'Closed' },
  ];

  selectedTicketStatus: FormControl = new FormControl({ id: -1, value: '' });

  customerTicket: FormControl = new FormControl();
  priceRange: FormControl = new FormControl();
  location: FormControl = new FormControl('', Validators.required);

  @ViewChild(ContactViewComponent)
  contactViewComponent: ContactViewComponent;

  dataTicket: any = [];

  constructor(
    public dialogRef: MatDialogRef<CustomerServiceTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public customerCardService: CustomerCardService,
    public signalRService: SignalRService,
    private kYCDocumentTypeService: KYCDocumentTypeService,
    private ref: ChangeDetectorRef,
    private contactFormService: ContactFormService
  ) {}

  ngOnInit(): void {
    this.isSpinning$ = isSpinning$;
    this.subscription = this.customerCardService
      .getCategory()
      .subscribe((data: any) => {
        this.categories = data;
        // this.isLoading = false;
        this.ref.detectChanges();
      });

    this.dataTicket = this.data.dataKey;
    this.ticketId = this.data.dataKey.id;
    this.kYCDocumentTypeService.saveTicketData(this.dataTicket);
    this.signalRService.init(this.ticketId);

    this.selectedTicketStatus.setValue(
      this.getTicketStatus(this.dataTicket.status)
    );

    this.subscription = this.customerCardService
      .getContactDetails(this.dataTicket)
      .subscribe((data: any) => {
        console.log(data);
        // this.isLoading = false;
        this.ref.detectChanges();
      });

    this.customerTicket.setValue(this.dataTicket.ticketCode);

    this.contactFormService.getMessageHistory(this.dataTicket.chatId);
  }

  getTicketStatus(statusId: number): BaseListItem {
    if (statusId == 0) return { id: 0, value: 'Created/Received Queue' };
    else if (statusId == 1) return { id: 1, value: 'In Process' };
    else if (statusId == 2) return { id: 2, value: 'Processed' };
    else if (statusId == 3) return { id: 3, value: 'Resolved' };
    else if (statusId == 4) return { id: 4, value: 'Closed' };
    else return null;
  }

  ngAfterViewInit() {
    this.signalRService.signalRSubject$.subscribe((data: any) => {
      this.contactViewComponent.updateData(data);
    });
  }

  openNote() {
    this.noteSectionFlag = !this.noteSectionFlag;
  }

  onChangeTicketStatus(event: Event) {
    this.dataTicket.status = event;

    let body = {
      id: this.dataTicket.id,
      status: this.dataTicket.status,
    };

    this.customerCardService.updateCustomServiceTicket(body);
  }

  // move to emergency flow or sales flow section
  displaySection(sectionFlag: string, categoryId: number) {
    this.choosedButtons.category = categoryId;
    this.canShowCalculator = false;
    // this.isLoading = true;
    this.isSpinning$ = isSpinning$;
    this.isBlue = !this.isBlue;
    switch (sectionFlag) {
      case 'business': {
        this.businessSectionFlag = true;
        this.salesFlowFlag = true;
        this.emergencyFlowFlag = false;
        this.complaintFlowFlag = false;
        this.otherFlowFlag = false;
        this.subscription = this.customerCardService
          .getBusiness()
          .subscribe((data: any) => {
            this.businesses = data;
            // this.isLoading = false;
            this.ref.detectChanges();
          });
        break;
      }
      case 'type': {
        this.typeSectionFlag = true;
        this.salesFlowFlag = false;
        this.otherFlowFlag = false;
        this.complaintFlowFlag = false;
        this.emergencyFlowFlag = true;
        this.subscription = this.customerCardService
          .getEmerencyTypeData()
          .subscribe((data: any) => {
            this.emergencyTypes = data;
            // this.isLoading = false;
            this.ref.detectChanges();
          });
        break;
      }
      case 'complaint': {
        this.typeSectionFlag = false;
        this.salesFlowFlag = false;
        this.otherFlowFlag = false;
        this.emergencyFlowFlag = false;
        this.complaintFlowFlag = true;

        this.complaintCategories = [
          { id: 0, name: 'Non Responsive' },
          { id: 1, name: 'Specific Employee' },
          { id: 2, name: 'Driver' },
          { id: 3, name: 'Payment' },
        ];

        break;
      }
      case 'otherDetails': {
        this.otherFlowFlag = true;
        this.salesFlowFlag = false;
        this.typeSectionFlag = false;
        this.emergencyFlowFlag = false;
        this.complaintFlowFlag = false;
        break;
      }
      default:
        break;
    }
  }

  // move to the product section
  displayProductSection(businessId: number) {
    // this.isLoading = true;
    this.isSpinning$ = isSpinning$;
    this.choosedButtons.business = businessId;

    this.subscription = this.customerCardService
      .getProduct(businessId)
      .subscribe((data: any) => {
        this.products = data;
        // this.isLoading = false;
        this.ref.detectChanges();
      });
    this.productSectionFlag = true;
  }

  // move to initialSection
  displayInitialSection(productId: number) {
    this.choosedButtons.product = productId;
    this.initialSectionFlag = true;
    this.canShowCalculator = true;
  }

  //  move to type section
  displayTypeSection() {
    this.typeSectionFlag = true;
    this.salesFlowFlag = false;
    this.emergencyFlowFlag = true;
  }

  // display location section
  displayLocationSection(emergencyTypeId: number) {
    // this.isLoading = true;
    this.isSpinning$ = isSpinning$;
    this.choosedButtons.emergencyType = emergencyTypeId;
    this.subscription = this.customerCardService
      .getEmergencyInitiateItems(emergencyTypeId)
      .subscribe((data: any) => {
        this.emergencyInitiateItems = data;

        // this.isLoading = false;
        this.ref.detectChanges();
      });
    this.locationSectionFlag = true;
  }

  displayEmergencyInitateSection(emergencyInitiateItemId?: number) {
    if (emergencyInitiateItemId) {
      if (this.choosedButtons.initiate.includes(emergencyInitiateItemId)) {
        this.choosedButtons.initiate.splice(
          this.choosedButtons.initiate.indexOf(emergencyInitiateItemId),
          1
        );
      } else this.choosedButtons.initiate.push(emergencyInitiateItemId);
    }

    this.emergencyInitialSectionFlag = true;
  }

  RequestDraftPolicy() {
    // this.isLoading = true;
    this.isSpinning$ = isSpinning$;
    if (this.priceValue == ' ') {
      this.disableButton = true;
      this.disableButtonClass = 'set-opacity';
      this.subscription = this.customerCardService
        .getRequiredData()
        .subscribe((data: any) => {
          this.requiredData = JSON.parse(data.jsonData);
          // this.isLoading = false;
          this.ref.detectChanges();
        });
    }
  }

  ngOnDestroy(): void {
    this.signalRService.stopConnection();
  }
}
