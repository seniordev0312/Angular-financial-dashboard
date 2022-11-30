import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseListItem } from '@root/shared/models/base-list-item.model';

@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss']
})
export class SelectListComponent implements OnInit {
  @Output() trigger = new EventEmitter<void>();
  @Input() label: string;
  @Input() formControl: FormControl;
  @Input() isMultiple = false;

  @Input() optionsList: BaseListItem[] = [{
    id: '1',
    name: '1111111'
  }];

  constructor() {
  }

  ngOnInit(): void {
  }

  onClick() {
    this.trigger.emit();
  }
}
