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
  secondSelectListFormControlName: string;

  @Input() fg: FormGroup;

  @Input() firstSelectListOptionsList: any[] = [];

  secondSelectListOptionsList: any[] = [];

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
