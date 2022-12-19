import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseListItem } from '@root/shared/models/base-list-item.model';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFieldComponent {
  @Input() label: string;
  @Input() name: string;
  @Input() value: string;
  @Input() type: string = 'text';
  @Input() control: FormControl;
  @Input() baseListItemsList: BaseListItem[];
  @Output() onTrigger = new EventEmitter<void>();

  constructor() {
  }

}
