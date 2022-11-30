import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayrollComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
