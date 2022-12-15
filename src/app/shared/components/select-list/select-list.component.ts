import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseListItem } from '@root/shared/models/base-list-item.model';

@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectListComponent {
  @Input() label: string;
  @Input() wfullclass: string;
  @Input() control: FormControl;
  @Input() isMultiple = false;
  @Input() icon: string;
  @Input() isDisabled = false;
  @Input() optionsList: BaseListItem[] = [];

  constructor() { }

}
