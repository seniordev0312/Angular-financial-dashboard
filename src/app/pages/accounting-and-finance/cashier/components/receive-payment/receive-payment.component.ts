import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receive-payment',
  templateUrl: './receive-payment.component.html',
  styleUrls: ['./receive-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceivePaymentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
