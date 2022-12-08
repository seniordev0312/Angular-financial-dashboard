import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  styleUrls: ['./add-holiday.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddHolidayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
