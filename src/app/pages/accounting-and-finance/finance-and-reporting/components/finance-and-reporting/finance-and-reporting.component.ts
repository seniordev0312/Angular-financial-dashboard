import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finance-and-reporting',
  templateUrl: './finance-and-reporting.component.html',
  styleUrls: ['./finance-and-reporting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinanceAndReportingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
