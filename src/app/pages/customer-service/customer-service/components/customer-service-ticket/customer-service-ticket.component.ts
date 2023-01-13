import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Inject,
  ChangeDetectorRef,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CustomerCardService } from '../../services/customer-card.service';

@Component({
  selector: 'app-customer-service-ticket',
  templateUrl: './customer-service-ticket.component.html',
  styleUrls: ['./customer-service-ticket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerServiceTicketComponent implements OnInit {
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
  pendingCardFlag: boolean = false;
  isShowAppField = false;
  categories: { id: number; name: string }[] = [];
  businesses: { id: number; name: string }[] = [];
  products: { id: number; productCode: string; productDescription: string }[] =
    [];
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
    business: number;
    product: number;
    emergencyType: number;
    initiate: number;
  } = {
    category: 0,
    business: 0,
    product: 0,
    emergencyType: 0,
    initiate: 0,
  };

  constructor(
    public dialogRef: MatDialogRef<CustomerServiceTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public customerCardService: CustomerCardService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription = this.customerCardService
      .getCategory()
      .subscribe((data: any) => {
        this.categories = data;
        this.ref.detectChanges();
      });
  }

  openNote() {
    this.noteSectionFlag = !this.noteSectionFlag;
  }

  // move to emergency flow or sales flow section
  displaySection(sectionFlag: string, categoryId: number) {
    this.choosedButtons.category = categoryId;
    console.log(this.choosedButtons.category);
    this.isBlue = !this.isBlue;
    switch (sectionFlag) {
      case 'business': {
        this.businessSectionFlag = true;
        this.salesFlowFlag = true;
        this.emergencyFlowFlag = false;
        this.subscription = this.customerCardService
          .getBusiness()
          .subscribe((data: any) => {
            this.businesses = data;
            this.ref.detectChanges();
          });
        break;
      }
      case 'type': {
        this.typeSectionFlag = true;
        this.salesFlowFlag = false;
        this.emergencyFlowFlag = true;
        this.subscription = this.customerCardService
          .getEmerencyTypeData()
          .subscribe((data: any) => {
            this.emergencyTypes = data;
            this.ref.detectChanges();
          });
        break;
      }
      default:
        break;
    }
  }

  // move to the product section
  displayProductSection(businessId: number) {
    this.choosedButtons.business = businessId;
    this.subscription = this.customerCardService
      .getProduct(businessId)
      .subscribe((data: any) => {
        this.products = data;
        this.ref.detectChanges();
      });
    this.productSectionFlag = true;
  }

  // move to initialSection
  displayInitialSection(productId: number) {
    this.choosedButtons.product = productId;
    this.initialSectionFlag = true;
  }

  //  move to type section
  displayTypeSection() {
    this.typeSectionFlag = true;
    this.salesFlowFlag = false;
    this.emergencyFlowFlag = true;
  }

  // display pending card
  displayPendingCard() {
    this.pendingCardFlag = true;
  }

  // display location section
  displayLocationSection(emergencyTypeId: number) {
    this.choosedButtons.emergencyType = emergencyTypeId;
    this.subscription = this.customerCardService
      .getEmergencyInitiateItems(emergencyTypeId)
      .subscribe((data: any) => {
        this.emergencyInitiateItems = data;
        this.ref.detectChanges();
      });
    this.locationSectionFlag = true;
  }

  displayEmergencyInitateSection() {
    this.emergencyInitialSectionFlag = true;
  }

  RequestDraftPolicy() {
    if (this.priceValue == ' ') {
      this.disableButton = true;
      this.disableButtonClass = 'set-opacity';
      this.subscription = this.customerCardService
        .getRequiredData()
        .subscribe((data: any) => {
          this.requiredData = JSON.parse(data.jsonData);
          this.ref.detectChanges();
        });
    }
  }
}
