import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewRef } from '@angular/core';
import { FormGroup, FormBuilder, ValidatorFn } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';
import _ from 'lodash';
import { Subject, Observable, takeUntil, startWith, map } from 'rxjs';

export interface ISelectSearchValidators {
  message: string;
  validatorFn: ValidatorFn; // ie: Validators.required or Validators.pattern(ValidatorPatterns.PHONE)
  type: string | ValidatorTypes;
}

export enum ValidatorTypes {
  Required = "required",
  MaxLength = "maxLength",
  MinLength = "minLength",
  Pattern = "pattern",
  Email = "email"
}


@Component({
  selector: 'app-single-select-search-list',
  templateUrl: './single-select-search-list.component.html',
  styleUrls: ['./single-select-search-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SingleSelectSearchListComponent
  implements AfterViewChecked, OnDestroy, OnInit {
  @ViewChild("searchDropdownInput")
  searchDropdownInput!: ElementRef<HTMLInputElement>;

  @ViewChild("multiAllOption") multiAllOption: MatOption;
  multiSelectedValues: any[];

  private _destroy$: Subject<any> = new Subject();

  @Output() selectedEvent = new EventEmitter<any>();
  @Output() formValidEvent = new EventEmitter<boolean>();
  @Input() selected?: any[];

  // required Inputs
  @Input() label!: string;
  @Input() options!: any[];
  maxNumOptionsBeforeSearch = 5;

  // optional Inputs
  @Input() maxItemsLoaded = 50;
  @Input() validatorArray?: ISelectSearchValidators[];
  @Input() validationRequiredText = "This is a required field";
  @Input() selectPlaceholder = "Select One";
  @Input() extractValue?: string;
  @Input() disableSelectSearch = false;
  @Input() searchPlaceholder = "Search";
  @Input() defaultOptionIndex = 0;
  @Input() panelClass = "";
  @Input() tooltipMessage?: string;
  @Input() setInitialValue = true;
  scrollClass = "";

  @Input() multiple = false;

  showSearch!: boolean;
  selectSearchForm: FormGroup;
  filteredOptions$: Observable<any[]>;
  showAllOption!: boolean;
  showClearButton!: boolean;
  private _filterValue?: string;
  private _filteredListLength: number;
  private _filteredList!: any[];

  constructor(
    private _formBuilder: FormBuilder,
    private _cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.options?.length > this.maxNumOptionsBeforeSearch) {
      this.showSearch = true;
      this.scrollClass = "scroll";
    }

    this._setUpFormControls(
      this.validatorArray,
      this.selected,
      this.setInitialValue,
      this.multiple
    );

    if (this.showSearch) {
      this.filteredOptions$ = this.selectSearchForm
        .get("SearchControl")
        .valueChanges.pipe(
          takeUntil(this._destroy$),
          startWith(''),
          map(value => {
            this.showClearButton = this._showClearButton(value);
            return this._filter(value);
          })
        );
    }

    this.selectSearchForm.statusChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe(res => {
        // response possibilities: VALID, INVALID, PENDING and DISABLED
        if (res === "VALID") {
          this.formValidEvent.emit(true);
        }
        if (res === "INVALID") {
          this.formValidEvent.emit(false);
        }
      });
  }

  ngAfterViewChecked(): void {
    if (this._cd && !(this._cd as ViewRef).destroyed) {
      this._cd.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next({});
    this._destroy$.complete();
  }

  compareWithFn(optionOne: any, optionTwo: any): boolean {
    if (typeof optionOne === "string" && typeof optionTwo === "string") {
      return optionOne === optionTwo;
    } else {
      return _.isEqual(optionOne, optionTwo);
    }
  }

  optionSelected($event: MatSelectChange): void {
    this._setSelectValue($event.value);
  }

  clear($event: any): void {

    $event.stopPropagation();
    this._filteredList = this.options.slice(0, this.maxItemsLoaded);
    this._setSelectValue(this.selected);
    this.selectSearchForm.get("SearchControl").setValue("");
    this.selectSearchForm.get("SearchControl").reset();
    this.selectPlaceholder = 'Select Module';
    this.showClearButton = false;
  }

  openedChange(opened: boolean) {
    if (!opened && this._filteredListLength === 0 && !this.multiple) {
      this.selectSearchForm.get("SearchControl").setValue("");
      this.selectSearchForm.get("SearchControl").reset();
      // no match set last selected option
      this._setSelectValue(this.selected);
    }

    if (!opened && this._filteredListLength > 0 && !this.multiple) {
      // set first match
      this._setSelectValue(this._filteredList[0]);
    }

    if (opened && !this.multiple) {
      if (
        !!this.searchDropdownInput.nativeElement.value
          .toLowerCase()
          .includes("all")
      ) {
        this.selectSearchForm.get("SearchControl").setValue("");
        this.selectSearchForm.get("SearchControl").reset();
        this.searchDropdownInput.nativeElement.value = "";
      }
      this.searchDropdownInput.nativeElement.focus();
    }

    // multi select logic
    if (this.multiple && !opened && !this.multiAllOption.selected) {
      const rawValue = this.selectSearchForm.getRawValue();
      this._setSelectValue(rawValue.SelectControl);
    }

    if (this.multiple && !opened && this.multiAllOption.selected) {
      this.selected = this.options;
      this._setSelectValue(this.selected);
    }
  }

  displayValue(value: any): string {
    if (!!value && !!this.extractValue && !!value[this.extractValue]) {
      return value[this.extractValue];
    } else {
      return value;
    }
  }

  toggleSelectAll(): void {
    const multiSelectControls = this.selectSearchForm.get("SelectControl");
    console.log('multiSelectControls', multiSelectControls);
    if (this.multiAllOption.selected) {
      if (this.showSearch) {
        multiSelectControls.setValue([...this.options]);
      } else {
        multiSelectControls.patchValue([...this.options.map(item => item), 0]);
      }

      this.multiAllOption.select();
    } else {
      this._setSelectValue([]);
      multiSelectControls.patchValue([]);
      this.multiAllOption.deselect();
    }
  }

  recalculateCheckedBoxes() {
    const multiSelectControls = this.selectSearchForm.get("SelectControl");

    const multiSelectLength = multiSelectControls.value.filter((x: any) => !!x).length;

    if (this.multiAllOption.selected) {
      this.multiAllOption.deselect();
      return false;
    }
    if (multiSelectLength === this.options.length) {
      this.multiAllOption.select();
    }
    return true;
  }

  private _getValidatorFns(
    validatorArray: ISelectSearchValidators[]
  ): ValidatorFn[] {
    const validators: any[] = [];
    if (!!validatorArray && validatorArray.length > 0) {
      validatorArray.forEach(x => validators.push(x.validatorFn));
    }
    return validators;
  }

  private _setUpFormControls(
    validators?: ISelectSearchValidators[],
    selected?: any,
    setInitialValue?: boolean,
    multiple?: boolean
  ): void {
    this.selectSearchForm = this._formBuilder.group({
      SelectControl: [
        this._setInitialValue(selected, setInitialValue, multiple),
        this._getValidatorFns(validators)
      ],
      SearchControl: [""]
    });
  }

  private _isOptionAll(value: any): boolean {
    if (!!value) {
      const displayValue = this.displayValue(value.value);
      return displayValue.toLowerCase().includes("all");
    } else {
      return false;
    }
  }

  private _setInitialValue(
    selected?: any,
    setInitialValue?: boolean,
    multiple?: boolean
  ): any {
    if (!!selected && setInitialValue) {
      this.selectedEvent.emit(selected);
      return selected;
    }

    if (
      !selected &&
      setInitialValue &&
      !multiple &&
      (this.defaultOptionIndex === 0 || !!this.defaultOptionIndex)
    ) {
      this.selected = this.options[this.defaultOptionIndex];

      this.selectedEvent.emit(this.selected);
      return this.selected;
    }

    return [];
  }

  private _setSelectValue(value: any) {

    if (!this._areEqual(value, this.selected)) {
      this.selected = value;
      // is first option multi All?
      if (Array.isArray(value[0])) {
        this.selectedEvent.emit(value[0]);
      } else {
        this.selectPlaceholder = value.value;
        this.selectedEvent.emit(value);
      }
      this.selectSearchForm.get("SelectControl").setValue(value.value);
      if (!this.multiple && !this._isOptionAll(value)) {
        this.selectSearchForm
          .get("SearchControl")
          .setValue(this.displayValue(value.value));
      }
    }
  }

  private _filter(value: any): string[] {
    if (!value || value.toLowerCase().includes("all")) {
      return this.options.slice(0, 50);
    }
    this._filterValue = value.toLowerCase();
    this._filteredList = this.options.filter(option => {
      const optionValue = this.displayValue(option.value);
      return optionValue.toLowerCase().indexOf(this._filterValue) !== -1;
    });
    this._filteredListLength = this._filteredList.length;
    // display first 50 matches
    return this._filteredList.slice(0, this.maxItemsLoaded);
  }

  private _showClearButton(value: string | any[]): boolean {
    if (!value) {
      return false
    }
    return value.length > 0;
  }

  private _areEqual(obj1: any, obj2: any): boolean {
    return this.displayValue(obj1) === this.displayValue(obj2);
  }
}
