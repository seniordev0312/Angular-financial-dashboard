import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  @Input() firstSelectListFormControlName: string;
  @Input() secondSelectListFormControlName: string;

  @Input() fg: FormGroup;

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
    return this.fg.get(this.secondSelectListFormControlName)?.value;
  }


  getChipLabel(id: string) {
    return this.secondSelectListOptionsList.find(c => c.id === id).name;
  }

  removeChip(id: string) {
    const types = this.fg.get(this.secondSelectListFormControlName).value.filter((c: string) => c !== id);

    this.fg.get(this.secondSelectListFormControlName).patchValue({ types })
  }

}
