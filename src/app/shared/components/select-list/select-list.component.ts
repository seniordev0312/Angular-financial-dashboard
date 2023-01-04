import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseListItem } from '@root/shared/models/base-list-item.model';

@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectListComponent implements OnInit {
  @Input() label: string;
  @Input() wfullclass: string;
  @Input() control: FormControl;
  @Input() isMultiple = false;
  @Input() icon: string;
  @Input() isDisabled = false;
  @Input() hasSearch = false;
  @Input() optionsList: BaseListItem[] = [];
  @Output() onSearch = new EventEmitter<string>();
  searchFormControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
    this.searchFormControl.valueChanges.subscribe(data => {
      this.onSearch.emit(data);
    })
  }

}
