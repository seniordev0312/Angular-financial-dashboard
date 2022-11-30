import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseListItem } from '@root/shared/models/base-list-item.model';

@Component({
  selector: 'app-select-list-with-chips',
  templateUrl: './select-list-with-chips.component.html',
  styleUrls: ['./select-list-with-chips.component.scss']
})
export class SelectListWithChipsComponent {
  @Input() firstSelectListLabel: string;
  @Input() secondSelectListLabel: string;
  @Input() showFirstSelectList = true;
  @Input() showAddIcon = true;

  @Input() firstSelectListFormControl: FormControl;
  @Input() secondSelectListFormControl: FormControl;

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

  constructor() {
  }

  get chipsList(): string[] {
    return this.secondSelectListFormControl?.value || [];
  }

  getChipLabel(id: string) {
    return this.secondSelectListOptionsList.find(c => c.id === id).name;
  }

  removeChip(id: string) {
    const temp = this.chipsList.filter(e => e !== id);
    this.secondSelectListFormControl.patchValue(temp);
  }

}
