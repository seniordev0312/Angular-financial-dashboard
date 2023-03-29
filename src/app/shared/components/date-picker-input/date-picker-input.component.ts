import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseComponent } from '../base-component/base-component';

@Component({
  selector: 'app-date-picker-input',
  templateUrl: './date-picker-input.component.html',
  styleUrls: ['./date-picker-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerInputComponent extends BaseComponent implements OnInit {
  @Input() dateValue: Date;
  @Input() value: string;
  @Input() label: string;
  @Input() control: FormControl;
  @Output() trigger = new EventEmitter<void>();
  @Output() dateValueChange = new EventEmitter<any>();
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.add(this.control.valueChanges.subscribe((data) => this.trigger.emit(data)));
  }

  dateChange() {
    this.dateValueChange.emit(this.dateValue);
  }
}
