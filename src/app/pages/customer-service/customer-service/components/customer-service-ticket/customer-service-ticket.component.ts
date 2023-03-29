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
import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { ConfirmEmergencyActionComponent } from '@root/pages/customer-service/customer-service-shared/components/confirm-emergency-action/confirm-emergency-action.component';
import { ClientChatService } from '@root/pages/customer-service/customer-service-shared/services/client-chat.service';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { CustomerServiceCategories } from '../../enums/customer-service-cateogries.enum';
import { RequiredProductData } from '../../models/pending-information-card.model';

@Component({
  selector: 'app-customer-service-ticket',
  templateUrl: './customer-service-ticket.component.html',
  styleUrls: ['./customer-service-ticket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerServiceTicketComponent
  extends BaseComponent
  implements OnInit {
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
  complaintCategoryFlowFlag: boolean = false;
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
  chosenButtons: {
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
  /* ticketStatus: BaseListItem[] = [
    { id: 0, value: 'Created/Received Queue' },
    { id: 1, value: 'In Process' },
    { id: 2, value: 'Processed' },
    { id: 3, value: 'Resolved' },
    { id: 4, value: 'Closed' },
  ]; */

  selectedTicketStatus: FormControl = new FormControl({ id: -1 });

  customerTicket: FormControl = new FormControl();
  priceRange: FormControl = new FormControl();

  location: FormControl = new FormControl('', Validators.required);

  complaintDetails: any = {
    description: '',
    response: -1,
  };

  otherDetails: any = {
    description: '',
    response: -1,
  };

  complaintOutcome: any = {
    outcome: '',
    response: -1,
  };

  otherOutcome: any = {
    outcome: '',
    response: -1,
  };

  selectedProductId: number;
  requiredProductData: RequiredProductData;

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
      }));

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
console.log('data ticket', this.dataTicket)
    if (this.ticketId)
      this.clientChatSignalRService.initConnection(this.ticketId);

    this.kYCDocumentTypeService.saveTicketData(this.dataTicket);

    this.setExistingData();

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

    this.selectedTicketStatus.setValue(this.dataTicket.status);
  }

  setExistingData() {
    if (this.dataTicket.category) {
      this.chosenButtons.category = this.dataTicket.category;
    }


    // emergency category
    if (this.dataTicket.category == CustomerServiceCategories.EmergencyId) {
      this.emergencyCategorySelected();
      this.getEmergencyTypes();

      if (this.dataTicket.emergencyTypeId) {
        this.locationSectionFlag = true;
        this.chosenButtons.emergencyType = this.dataTicket.emergencyTypeId;
      }

      if (this.dataTicket.locationAddress) {
        this.location.setValue(this.dataTicket.locationAddress);
        this.emergencyInitialSectionFlag = true;
      }
    }

    // sales category
    if (this.dataTicket.category == CustomerServiceCategories.SalesInquiryId) {
      this.salesCategorySelected();
      this.getLineOfBusiness();

      if (this.dataTicket.lineOfBusinessId) {
        this.chosenButtons.business = this.dataTicket.lineOfBusinessId;

        this.productSectionFlag = true;

        this.getProducts(this.dataTicket.lineOfBusinessId);
      }

      if (this.dataTicket.productId) {
        this.chosenButtons.product = this.dataTicket.productId;
        this.initialSectionFlag = true;
      }
    }

    // complaints category
    if (this.dataTicket.category == CustomerServiceCategories.ComplaintsId) {
      this.getComplaintCategories();
      this.complaintCategoryFlowFlag = true;

      if (this.dataTicket.complaintCategory) {
        this.complaintsCategorySelected();

        this.chosenButtons.complaintCategory =
          this.dataTicket.complaintCategory;

        if (this.dataTicket.complaintDescription)
          this.complaintDetails.description =
            this.dataTicket.complaintDescription;

        if (this.dataTicket.complaintSeverity)
          this.complaintDetails.response = this.dataTicket.complaintSeverity;

        if (this.dataTicket.complaintOutcome)
          this.complaintOutcome.outcome = this.dataTicket.complaintOutcome;

        if (this.dataTicket.complaintCustomerSatisfaction)
          this.complaintOutcome.response =
            this.dataTicket.complaintCustomerSatisfaction;
      }
    }

    // others category
    if (this.dataTicket.category == CustomerServiceCategories.OtherId) {
      this.otherCategorySelected();

      if (this.dataTicket.otherDescription)
        this.otherDetails.description = this.dataTicket.otherDescription;

      if (this.dataTicket.otherSeverity)
        this.otherDetails.response = this.dataTicket.otherSeverity;

      if (this.dataTicket.otherOutcome)
        this.otherOutcome.outcome = this.dataTicket.otherOutcome;

      if (this.dataTicket.otherCustomerSatisfaction)
        this.otherOutcome.response = this.dataTicket.otherCustomerSatisfaction;
    }
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
    this.chosenButtons.category = categoryId;
    this.canShowCalculator = false;
    // this.isLoading = true;
    this.isSpinning$ = isSpinning$;
    this.isBlue = !this.isBlue;
    switch (sectionFlag) {
      case 'business': {
        this.salesCategorySelected();

        let body: any = {
          category: 2,
          categorySpecified: true,
        };

        this.customerCardService.updateCustomServiceTicketDetails(
          this.ticketId,
          body
        );

        this.getLineOfBusiness();
        break;
      }
      case 'type': {
        this.emergencyCategorySelected();

        let body: any = {
          category: 1,
          categorySpecified: true,
        };

        this.customerCardService.updateCustomServiceTicketDetails(
          this.ticketId,
          body
        );

        this.getEmergencyTypes();
        break;
      }
      case 'complaint': {
        this.complaintsCategorySelected();

        let body: any = {
          category: 3,
          categorySpecified: true,
        };

        this.customerCardService.updateCustomServiceTicketDetails(
          this.ticketId,
          body
        );

        this.getComplaintCategories();
        break;
      }
      case 'otherDetails': {
        this.otherCategorySelected();

        let body: any = {
          category: 4,
          categorySpecified: true,
        };

        this.customerCardService.updateCustomServiceTicketDetails(
          this.ticketId,
          body
        );

        break;
      }
      default:
        break;
    }
  }

  emergencyCategorySelected() {
    this.typeSectionFlag = true;
    this.emergencyFlowFlag = true;
    this.salesFlowFlag = false;
    this.otherFlowFlag = false;
    this.complaintFlowFlag = false;
  }

  salesCategorySelected() {
    this.businessSectionFlag = true;
    this.salesFlowFlag = true;
    this.emergencyFlowFlag = false;
    this.complaintFlowFlag = false;
    this.otherFlowFlag = false;
  }

  complaintsCategorySelected() {
    this.typeSectionFlag = false;
    this.salesFlowFlag = false;
    this.otherFlowFlag = false;
    this.emergencyFlowFlag = false;
    this.complaintFlowFlag = true;
  }

  otherCategorySelected() {
    this.otherFlowFlag = true;
    this.salesFlowFlag = false;
    this.typeSectionFlag = false;
    this.emergencyFlowFlag = false;
    this.complaintFlowFlag = false;
  }

  getComplaintCategories() {
    this.subscriptions.add(
      this.customerCardService
        .getComplaintsCategoriesApi()
        .subscribe((data: any) => {
          this.complaintCategories = data;
          this.ref.detectChanges();
        })
    );
  }

  getLineOfBusiness() {
    this.subscriptions.add(
      this.customerCardService.getBusiness().subscribe((data: any) => {
        this.businesses = data;
        // this.isLoading = false;
        this.ref.detectChanges();
      })
    );
  }

  getEmergencyTypes() {
    this.subscriptions.add(
      this.customerCardService.getEmerencyTypeData().subscribe((data: any) => {
        this.emergencyTypes = data;
        // this.isLoading = false;
        this.ref.detectChanges();
      })
    );
  }

  getProducts(businessId: number) {
    this.subscriptions.add(
      this.customerCardService.getProduct(businessId).subscribe((data: any) => {
        this.products = data;
        // this.isLoading = false;
        this.ref.detectChanges();
      })
    );
  }

  // move to the product section
  displayProductSection(businessId: number) {
    // this.isLoading = true;

    let body: any = {
      lineOfBusinessId: businessId,
      lineOfBusinessIdSpecified: true,
    };

    this.customerCardService.updateCustomServiceTicketDetails(
      this.ticketId,
      body
    );

    this.isSpinning$ = isSpinning$;
    this.chosenButtons.business = businessId;

    this.getProducts(businessId);

    this.selectedProductId = businessId;

    this.subscription = this.customerCardService
      .getRequiredProductData(this.selectedProductId)
      .subscribe((data: any) => {
        this.requiredProductData = data;
        console.log("Required Product data", this.requiredProductData)
        this.ref.detectChanges();
      });

    this.productSectionFlag = true;



  }

  // move to initialSection
  displayInitialSection(productId: number) {
    this.chosenButtons.product = productId;
    this.initialSectionFlag = true;
    this.canShowCalculator = true;

    let body: any = {
      productId: productId,
      productIdSpecified: true,
    };

    this.customerCardService.updateCustomServiceTicketDetails(
      this.ticketId,
      body
    );
  }

  //  move to type section
  displayTypeSection() {
    this.typeSectionFlag = true;
    this.salesFlowFlag = false;
    this.emergencyFlowFlag = true;
  }

  // display location section
  displayLocationSection(emergencyTypeId: number) {
    let body: any = {
      emergencyTypeId: emergencyTypeId,
      emergencyTypeIdSpecified: true,
    };

    this.customerCardService.updateCustomServiceTicketDetails(
      this.ticketId,
      body
    );

    // this.isLoading = true;
    this.isSpinning$ = isSpinning$;
    this.chosenButtons.emergencyType = emergencyTypeId;

    this.locationSectionFlag = true;
  }

  displayEmergencyInitateSection() {
    this.subscriptions.add(
      this.customerCardService
        .getEmergencyInitiateItems(this.chosenButtons.emergencyType)
        .subscribe((data: any) => {
          this.emergencyInitiateItems = data;

          // this.isLoading = false;
          this.ref.detectChanges();
        })
    );

    this.emergencyInitialSectionFlag = true;
  }

  onSelectComplaintCategory(complaintCategoryId: number) {
    this.chosenButtons.complaintCategory = complaintCategoryId;

    let body: any = {
      complaintCategory: complaintCategoryId,
      complaintCategorySpecified: true,
    };

    this.customerCardService.updateCustomServiceTicketDetails(
      this.ticketId,
      body
    );
  }

  onSubmitOtherDetails(event: any) {
    let body: any = {
      otherDescription: event.details,
      otherDescriptionSpecified: true,
      otherSeverity: event.response,
      otherSeveritySpecified: true,
    };

    this.customerCardService.updateCustomServiceTicketDetails(
      this.ticketId,
      body
    );
  }

  onSubmitComplaintDetails(event: any) {
    let body: any = {
      complaintDescription: event.details,
      complaintDescriptionSpecified: true,
      complaintSeverity: event.response,
      complaintSeveritySpecified: true,
    };

    this.customerCardService.updateCustomServiceTicketDetails(
      this.ticketId,
      body
    );
  }

  onSubmitComplaintOutcome(event: any) {
    let body: any = {
      complaintOutcome: event.outcome,
      complaintOutcomeSpecified: true,
      complaintCustomerSatisfaction: event.response,
      complaintCustomerSatisfactionSpecified: true,
    };

    this.customerCardService.updateCustomServiceTicketDetails(
      this.ticketId,
      body
    );
  }

  onSubmitOtherOutcome(event: any) {
    let body: any = {
      otherOutcome: event.outcome,
      otherOutcomeSpecified: true,
      otherCustomerSatisfaction: event.response,
      otherCustomerSatisfactionSpecified: true,
    };

    this.customerCardService.updateCustomServiceTicketDetails(
      this.ticketId,
      body
    );
  }

  onSelectEmergencyItem(emergencyInitiateItem: any) {
    if (
      emergencyInitiateItem &&
      !this.chosenButtons.initiate.includes(emergencyInitiateItem.id)
    ) {
      let location = this.location.value;

      this.dialog
        .open(ConfirmEmergencyActionComponent, {
          width: '25%',
          height: '200px',
          data: {
            emergencyAction: emergencyInitiateItem,
            location: location,
            chosenButtons: this.chosenButtons.initiate,
          },
        })
        .afterClosed()
        .subscribe((result) => {
          if (result) {
            this.chosenButtons.initiate.push(result.emergencyAction);
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
