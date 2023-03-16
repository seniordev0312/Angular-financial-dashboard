import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pay-make-payment',
  templateUrl: './pay-make-payment.component.html',
  styleUrls: ['./pay-make-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayMakePaymentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
