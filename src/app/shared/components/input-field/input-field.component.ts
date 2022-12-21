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
  @Input() name: string;
  @Input() value: string;
  @Input() type: string = 'text';
  @Input() control: FormControl;
  @Input() icon: string;
  @Input() baseListItemsList: BaseListItem[];
  @Output() trigger = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
    this.control.valueChanges.subscribe(data => this.trigger.emit(data));
  }

}
