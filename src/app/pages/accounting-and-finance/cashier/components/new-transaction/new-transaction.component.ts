import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTransactionComponent implements OnInit {
  paymentFlag: boolean = false;
  currentDate: Date;

  constructor() {}

  ngOnInit(): void {
    this.currentDate = new Date();
  }

  switchPaymentOption() {
    this.paymentFlag = !this.paymentFlag;
  }
}
