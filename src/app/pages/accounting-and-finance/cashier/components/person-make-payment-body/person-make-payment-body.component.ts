import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-make-payment-body',
  templateUrl: './person-make-payment-body.component.html',
  styleUrls: ['./person-make-payment-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonMakePaymentBodyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
