import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleSelectComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() extractValue?: string;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() items: any = [];

  filteredOptions$: Observable<any[]>;
  showClearButton: boolean = false;
  private _filterValue: any;
  private _filteredList: any;
  constructor() { }

  ngOnInit(): void {
    this.filteredOptions$ = this.formGroup.get("search")
      .valueChanges
      .pipe(
        startWith(''),
        map(value => {
          this.showClearButton = this.checkValue(value);
          return this.filter(value);
        })
      );

  }
  filter(value: any): string[] {
    this._filterValue = value ? value.toLowerCase() : '';
    this._filteredList = this.items?.filter((option: any) => {
      const optionValue = this.displayValue(option.value);
      return optionValue?.toLowerCase().indexOf(this._filterValue) !== -1;
    });
    return this._filteredList;
  }

  displayValue(value: any): string {
    if (value && this.extractValue && value[this.extractValue]) {
      return value[this.extractValue];
    } else {
      return value;
    }
  }

  checkValue(value: string | any[]): boolean {
    if (!value) {
      return false
    }
    return value.length > 0;
  }

  clear($event: any) {
    $event.stopPropagation();

    this._filteredList = this.items;

    this.formGroup.get("search").setValue("");
    this.formGroup.get("search").reset();
    this.placeholder = 'Select Module';
    this.showClearButton = false;
  }

}
