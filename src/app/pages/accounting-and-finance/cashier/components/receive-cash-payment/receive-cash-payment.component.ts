import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receive-cash-payment',
  templateUrl: './receive-cash-payment.component.html',
  styleUrls: ['./receive-cash-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceiveCashPaymentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
