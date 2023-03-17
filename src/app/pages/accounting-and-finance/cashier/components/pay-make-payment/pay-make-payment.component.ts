import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-pay-make-payment',
  templateUrl: './pay-make-payment.component.html',
  styleUrls: ['./pay-make-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayMakePaymentComponent implements OnInit {
  @Input() totalPrice: number;
  paymentStatus: string = 'person';

  constructor() {}

  ngOnInit(): void {}
}
