import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { EinValue$ } from '@root/pages/accounting-and-finance/General-accounting/general-accounting/general-accounting.store';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FieldsObject, RequiredProductData } from '../../models/pending-information-card.model';
//import { DraftPolicyPendingInfoService } from '../../services/draft-policy-pending-info.service';
import { CustomerCardService } from '../../services/customer-card.service';
import { LayoutService } from '@root/shared/services/layout.service';
import { ElementsTypes } from '../customer-service/enum/elementsType.enum';

@Component({
  selector: 'app-pending-informaiton-card',
  templateUrl: './pending-informaiton-card.component.html',
  styleUrls: ['./pending-informaiton-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PendingInformaitonCardComponent implements OnInit {

  @Input() productId: number;
  @Input() requiredData: RequiredProductData;

  formArray: FormArray;
  fg: FormGroup;
  isFormValid: boolean = false;
  subscription: Subscription;
  elementsTypes: any[];
  selectedItem: any;
  itemsListControl: FormControl = new FormControl({ id: 0, value: null });

  ElementsTypes = ElementsTypes;
  einValue: any = null;

  /* link = ElementsTypes.Link;
  dynamicLink = ElementsTypes.DynamicLink;
  check: ElementsTypes.Check;
  select: ElementsTypes.Select;
  table: ElementsTypes.Table;
  attachment: ElementsTypes.Attachment;
  ein: ElementsTypes.Ein;
  text: ElementsTypes.Text;
  script: ElementsTypes.Script;
  textEditor: ElementsTypes.TextEditor;
  date: ElementsTypes.Date;
  dateAndTime: ElementsTypes.DateAndTime;
  number: ElementsTypes.Number;
  string: ElementsTypes.String;
  barcode: ElementsTypes.Barcode;
  button: ElementsTypes.Button;
  color: ElementsTypes.Color;
  currency: ElementsTypes.Currency;
  json: ElementsTypes.Json */


  constructor(
    //private draftPolicyPendingInfoService: DraftPolicyPendingInfoService,
    private customerCardService: CustomerCardService,
    private ref: ChangeDetectorRef,
    private layoutService: LayoutService,
  ) { }


  ngOnInit(): void {
    this.subscription = this.customerCardService
      .getElementsTypes()
      .subscribe((data: any) => {
        this.elementsTypes = data;
        this.ref.detectChanges();
      });

    this.subscription.add(EinValue$.subscribe(data => {
      if (data.search('01-') !== -1) {
        //console.log(data);
        this.einValue = data;
      }
      this.ref.detectChanges();
    }));

    this.fg = this.getFormGroup();
    this.detectValueChanges();

    //this.fg = this.draftPolicyPendingInfoService.getFormGroup();
  }

  detectValueChanges(): void {
    this.fg.valueChanges.subscribe(() => {
      console.log(this.fg);
      console.log(this.fg.value);
    })
  }

  onEinFocus() {
    this.layoutService.changeEinFocus(1);
  }

  getElementType() {
    return this.elementsTypes;
  }

  onSelectItem(event: Event) {
    this.selectedItem = event;
  }

  getFormGroup(): FormGroup {
    const fg: any = {};
    this.requiredData?.sections?.map(section => {
      section.fields?.map(field => {
        if (field.mandatory === true) {
          fg[field.description] = new FormControl(null, [Validators.required]);
        }
        else {
          fg[field.description] = new FormControl();
        }
      })

    });
    return new FormGroup(fg);
  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }

  getValueFromFormGroup(fg: FormGroup): FieldsObject[] {
    let obj: FieldsObject[];
    console.log(fg);
    obj.forEach(field => {
      field.description = fg.controls.key.value;
    })
    return obj;
  }

  checkFormValidity(fg: FormGroup) {
    if (fg.valid) {
      this.isFormValid = true;
    } else {
      this.isFormValid = false;
    }
  }

}
