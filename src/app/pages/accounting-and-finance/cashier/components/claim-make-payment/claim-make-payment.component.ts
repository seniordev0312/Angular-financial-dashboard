import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-claim-make-payment',
  templateUrl: './claim-make-payment.component.html',
  styleUrls: ['./claim-make-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClaimMakePaymentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
