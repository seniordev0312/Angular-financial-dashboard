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
  @Input() firstSelectListLabel: string;
  @Input() secondSelectListLabel: string;
  @Input() showFirstSelectList = true;
  @Input() showAddIcon = true;

  @Input() firstSelectListFormControlName: string;
  @Input() secondSelectListFormControlName: string;

  @Input() fg: FormGroup;
  @Input() arrayControlName: string;

  @Input() firstSelectListOptionsList: BaseListItem[] = [{
    id: '1',
    name: '1111111'
  }];

  @Input() secondSelectListOptionsList: BaseListItem[] = [{
    id: '1',
    name: '1111111'
  },
  {
    id: '2',
    name: '1111111'
  },
  {
    id: '3',
    name: '1111111'
  },
  {
    id: '4',
    name: '1111111'
  },
  {
    id: '5',
    name: '1111111'
  }];

  get items() {
    return this.fg && this.formArrayService.getFormArrayItems(this.arrayControlName, this.fg) as FormArray;
  }

  constructor(private formArrayService: FormArrayService) {
  }

  getFormGroup(index: number): FormGroup {
    return this.items?.controls[index] as FormGroup;
  }

  getChipsList(index: number): string[] {
    return this.getFormGroup(index)?.get(this.secondSelectListFormControlName)?.value || [];
  }

  getChipLabel(id: string) {
    return this.secondSelectListOptionsList.find(c => c.id === id).name;
  }

  removeChip(id: string, index: number) {
    const types = this.getChipsList(index).filter(e => e !== id);
    this.getFormGroup(index).patchValue({ types });
  }

  onAddClicked() {
    this.addNewItem.emit();
  }
}
