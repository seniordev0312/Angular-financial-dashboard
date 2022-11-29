import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseListItem } from '@root/shared/models/base-list-item.model';

@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss']
})
export class SelectListComponent implements OnInit {
  @Input() label: string;
  @Input() formControl: FormControl;
  @Input() isMultiple = false;

  @Input() optionsList: BaseListItem[] = [{
    id: '1',
    name: '1111111'
  }];
  @Output() onTrigger = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onClick() {
    this.onTrigger.emit();
  }
}
