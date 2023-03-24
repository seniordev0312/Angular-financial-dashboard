import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CustomerCardService } from '../../services/customer-card.service';
import { isSpinning$ } from '@root/shared/store/shared.store';
import { Observable } from 'rxjs';
import { ContactViewComponent } from '../contact-view/contact-view.component';
import { KYCDocumentTypeService } from '../../services/kyc-documents-type.service';
import { FormControl, Validators } from '@angular/forms';
import { ContactFormService } from '../../services/contact-form.service';
import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { ConfirmEmergencyActionComponent } from '@root/pages/customer-service/customer-service-shared/components/confirm-emergency-action/confirm-emergency-action.component';
import { ClientChatService } from '@root/pages/customer-service/customer-service-shared/services/client-chat.service';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { CustomerServiceCategories } from '../../enums/customer-service-cateogries.enum';

@Component({
  selector: 'app-customer-service-ticket',
  templateUrl: './customer-service-ticket.component.html',
  styleUrls: ['./customer-service-ticket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerServiceTicketComponent
  extends BaseComponent
  implements OnInit
{
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
  emergencyInitiateSectionFlag: boolean = false;
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

  ticketStatus: BaseListItem[] = [];

  selectedTicketStatus: FormControl = new FormControl({ id: -1, value: '' });

  customerTicket: FormControl = new FormControl();
  priceRange: FormControl = new FormControl();

  location: FormControl = new FormControl('', Validators.required);

  @ViewChild(ContactViewComponent)
  contactViewComponent: ContactViewComponent;

  dataTicket: any = [];

  CustomerServiceCategories = CustomerServiceCategories;
  
  constructor(
    public dialogRef: MatDialogRef<CustomerServiceTicketComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public customerCardService: CustomerCardService,
    private kYCDocumentTypeService: KYCDocumentTypeService,
    private ref: ChangeDetectorRef,
    private contactFormService: ContactFormService,
    public clientChatSignalRService: ClientChatService
  ) {
    super();
  }

  ngOnInit(): void {
    this.isSpinning$ = isSpinning$;

    this.subscriptions.add(
      this.customerCardService.getCategory().subscribe((data: any) => {
        this.categories = data;
        // this.isLoading = false;
        this.ref.detectChanges();
      })
    );

    this.subscriptions.add(
      this.customerCardService.getTicketStatusApi().subscribe((data: any) => {
        this.ticketStatus = data.map((e: any) => ({
          id: e.value,
          value: e.code,
        }));
        this.ref.detectChanges();
      })
    );

    this.dataTicket = this.data.dataKey;
    this.ticketId = this.data.dataKey.id;

    if (this.ticketId)
      this.clientChatSignalRService.initConnection(this.ticketId);

    this.kYCDocumentTypeService.saveTicketData(this.dataTicket);

    if (this.dataTicket.locationAddress) {
      this.location.setValue(this.dataTicket.locationAddress);
    }

    this.subscriptions.add(
      this.customerCardService
        .getContactDetails(this.dataTicket)
        .subscribe((data: any) => {
          console.log(data);
          // this.isLoading = false;
          this.ref.detectChanges();
        })
    );

    this.customerTicket.setValue(this.dataTicket.ticketCode);

    this.contactFormService.getMessageHistory(425);
  }

  ngAfterViewInit() {
    this.clientChatSignalRService.signalRSubject$.subscribe((data: any) => {
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

        this.subscriptions.add(
          this.customerCardService.getBusiness().subscribe((data: any) => {
            this.businesses = data;
            // this.isLoading = false;
            this.ref.detectChanges();
          })
        );
        break;
      }
      case 'type': {
        this.typeSectionFlag = true;
        this.salesFlowFlag = false;
        this.otherFlowFlag = false;
        this.complaintFlowFlag = false;
        this.emergencyFlowFlag = true;

        this.subscriptions.add(
          this.customerCardService
            .getEmerencyTypeData()
            .subscribe((data: any) => {
              this.emergencyTypes = data;
              // this.isLoading = false;
              this.ref.detectChanges();
            })
        );
        break;
      }
      case 'complaint': {
        this.typeSectionFlag = false;
        this.salesFlowFlag = false;
        this.otherFlowFlag = false;
        this.emergencyFlowFlag = false;
        this.complaintFlowFlag = true;

        this.customerCardService
          .getComplaintsCategoriesApi()
          .subscribe((data: any) => {
            this.complaintCategories = data;
            this.ref.detectChanges();
          });

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

    this.subscriptions.add(
      this.customerCardService.getProduct(businessId).subscribe((data: any) => {
        this.products = data;
        // this.isLoading = false;
        this.ref.detectChanges();
      })
    );
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

    this.locationSectionFlag = true;
  }

  displayEmergencyInitateSection() {
    this.subscriptions.add(
      this.customerCardService
        .getEmergencyInitiateItems(this.choosedButtons.emergencyType)
        .subscribe((data: any) => {
          this.emergencyInitiateItems = data;

          // this.isLoading = false;
          this.ref.detectChanges();
        })
    );

    this.emergencyInitialSectionFlag = true;
  }

  onSelectComplaintCategory(complaintCategory: number) {
    this.choosedButtons.complaintCategory = complaintCategory;
  }

  onSelectEmergencyItem(emergencyInitiateItem: any) {
    if (
      emergencyInitiateItem &&
      !this.choosedButtons.initiate.includes(emergencyInitiateItem.id)
    ) {
      let location = this.location.value;

      this.dialog
        .open(ConfirmEmergencyActionComponent, {
          width: '25%',
          height: '200px',
          data: {
            emergencyAction: emergencyInitiateItem,
            location: location,
            choosedButtons: this.choosedButtons.initiate,
          },
        })
        .afterClosed()
        .subscribe((result) => {
          if (result) {
            this.choosedButtons.initiate.push(result.emergencyAction);
            this.ref.detectChanges();
          }
        });
    }
  }

  RequestDraftPolicy() {
    // this.isLoading = true;
    this.isSpinning$ = isSpinning$;
    if (this.priceValue == ' ') {
      this.disableButton = true;
      this.disableButtonClass = 'set-opacity';
      this.subscriptions.add(
        this.customerCardService.getRequiredData().subscribe((data: any) => {
          this.requiredData = JSON.parse(data.jsonData);
          // this.isLoading = false;
          this.ref.detectChanges();
        })
      );
    }
  }

  onSaveLocation() {
    let body: any = {
      location: this.location.value,
      locationSpecified: true,
    };

    this.customerCardService.updateCustomServiceTicketDetails(
      this.ticketId,
      body
    );
  }

  onSubmitNote(event: Event) {
    let body: any = {
      note: event,
      noteSpecified: true,
    };

    this.customerCardService.updateCustomServiceTicketDetails(
      this.ticketId,
      body
    );
    this.noteSectionFlag = false;
  }

  ngOnDestroy(): void {
    this.clientChatSignalRService.stopSignalRConnection();
  }
}
