import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
// import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-date-picker-input',
  templateUrl: './date-picker-input.component.html',
  styleUrls: ['./date-picker-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerInputComponent implements OnInit {
  @Input() value: string;
  constructor() { }

  ngOnInit(): void {
  }

}
