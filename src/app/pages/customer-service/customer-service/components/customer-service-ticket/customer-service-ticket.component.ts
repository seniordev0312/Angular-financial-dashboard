import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CustomerCardService } from '../../services/customer-card.service';
import { isSpinning$ } from '@root/shared/store/shared.store';
import { Observable } from 'rxjs';

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
  pendingCardFlag: boolean = false;
  isShowAppField = false;
  isLoading = false;
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
  ) { }

  ngOnInit(): void {
    this.isSpinning$ = isSpinning$;
    this.subscription = this.customerCardService
      .getCategory()
      .subscribe((data: any) => {
        this.categories = data;
        // this.isLoading = false;
        this.ref.detectChanges();
      });
    console.log(this.data);
  }

  openNote() {
    this.noteSectionFlag = !this.noteSectionFlag;
  }

  // move to emergency flow or sales flow section
  displaySection(sectionFlag: string, categoryId: number) {
    this.choosedButtons.category = categoryId;
    // this.isLoading = true;
    this.isSpinning$ = isSpinning$;
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
            // this.isLoading = false;
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
            // this.isLoading = false;
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

  displayEmergencyInitateSection() {
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
}
