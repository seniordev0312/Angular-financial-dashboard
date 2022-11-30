import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseListItem } from '@root/shared/models/base-list-item.model';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFieldComponent implements OnInit {
  @Input() label: string;
  @Input() formControl: FormControl;
  @Input() baseListItemsList: BaseListItem[];
  @Output() onTrigger = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onClick() {
    this.onTrigger.emit();
  }
}
