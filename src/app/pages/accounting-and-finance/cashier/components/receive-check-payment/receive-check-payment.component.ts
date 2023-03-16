import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receive-check-payment',
  templateUrl: './receive-check-payment.component.html',
  styleUrls: ['./receive-check-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReceiveCheckPaymentComponent implements OnInit {
  processSection: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  process() {
    this.processSection = true;
  }
}