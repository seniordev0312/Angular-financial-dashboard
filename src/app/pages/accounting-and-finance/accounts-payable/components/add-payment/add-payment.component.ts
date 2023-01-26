import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPaymentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
