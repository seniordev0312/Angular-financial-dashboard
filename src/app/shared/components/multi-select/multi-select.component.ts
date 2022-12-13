import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSelectComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() extractValue?: string;
  @Input() label?: string;
  @Input() items: any;
  @ViewChild("multiAllOption") multiAllOption: MatOption;

  constructor() { }

  displayValue(value: any): string {
    if (value && this.extractValue && value[this.extractValue]) {
      return value[this.extractValue];
    } else {
      return value;
    }
  }

  get options(): FormArray {
    return this.formGroup.get("options") as FormArray
  }

  ngOnInit(): void {
  }

  toggleSelectAll(): void {
    const multiSelectControls = this.formGroup.get("options");
    if (this.multiAllOption.selected) {
      multiSelectControls.patchValue([...this.items.map((item: any) => item)]);
      this.multiAllOption.select();
    } else {
      multiSelectControls.patchValue([]);
      this.multiAllOption.deselect();
    }
  }


  recalculateCheckedBoxes(): boolean {
    const multiSelectControls = this.formGroup.get("options");
    const multiSelectLength = multiSelectControls.value.filter((x: any) => !!x).length;
    if (this.multiAllOption.selected) {
      this.multiAllOption.deselect();
      return false;
    }
    if (multiSelectLength === this.options.length) {
      this.multiAllOption.select();
      return true
    }
    return true
  }
}
