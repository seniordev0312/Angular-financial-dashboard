import { DatePipe } from '@angular/common';
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
  @Input() name: string;
  @Input() dateFormat: string;
  @Output() trigger = new EventEmitter<any>();
  pipe = new DatePipe('en-US');
  @Output() dateValueChange = new EventEmitter<any>();
  constructor() {
    super();
  }
  ngOnInit(): void {
    this.control.valueChanges.subscribe((data) => {
      this.dateValue = data;
      let date = this.pipe.transform(
        data,
        this.dateFormat
      )
      this.trigger.emit(date)
    });
  }

  dateChange() {
    this.dateValueChange.emit(this.dateValue);
  }
}
