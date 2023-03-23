import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-make-payment',
  templateUrl: './other-make-payment.component.html',
  styleUrls: ['./other-make-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtherMakePaymentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
