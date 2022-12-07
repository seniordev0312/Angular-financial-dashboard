import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
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
  @Input() control: FormControl;
  @Input() baseListItemsList: BaseListItem[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }
}
