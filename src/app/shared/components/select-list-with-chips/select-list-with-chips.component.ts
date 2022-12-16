import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { FormArrayService } from '@root/shared/services/form-array.service';

@Component({
  selector: 'app-select-list-with-chips',
  templateUrl: './select-list-with-chips.component.html',
  styleUrls: ['./select-list-with-chips.component.scss']
})
export class SelectListWithChipsComponent {
  @Output() addNewItem = new EventEmitter<void>();
  @Input() isFirstFieldSelectList = false;

  @Input() fg: FormGroup;
  @Input() arrayControlName: string;
  @Input() firstFieldFormControlName: string;
  @Input() secondFieldFormControlName: string;
  @Input() secondSelectListOptionsList: BaseListItem[] = [];
  @Input() firstSelectListOptionsList: BaseListItem[] = [];

  constructor(private formArrayService: FormArrayService) {
  }

  get chipsList(): string[] {
    return this.fg.get(this.arrayControlName)?.value;
  }

  get items() {
    return this.fg && this.formArrayService.getFormArrayItems(this.arrayControlName, this.fg) as FormArray;
  }

  removeChip(index: number) {
    this.formArrayService.removeItemFromFormArray(this.arrayControlName, this.fg, index);
  }

  onAddClicked() {
    this.addNewItem.emit();
  }

  getSecondLabel(id: string) {
    return this.secondSelectListOptionsList.find(e => e.id === id).value;
  }

  getFirstLabel(id: string) {
    return this.firstSelectListOptionsList.find(e => e.id === id).value;
  }

  getChipLabel(index: number) {
    const data = this.items.controls[index].value;
    if (this.isFirstFieldSelectList) {
      return this.getFirstLabel(data[this.firstFieldFormControlName]) + ' - ' + this.getSecondLabel(data[this.secondFieldFormControlName]);
    }
    return data[this.firstFieldFormControlName] + ' - ' + this.getSecondLabel(data[this.secondFieldFormControlName]);
  }
}
