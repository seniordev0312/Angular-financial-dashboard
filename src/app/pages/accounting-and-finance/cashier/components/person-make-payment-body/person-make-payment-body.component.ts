import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { BaseListItem } from '@root/shared/models/base-list-item.model';

@Component({
  selector: 'app-person-make-payment-body',
  templateUrl: './person-make-payment-body.component.html',
  styleUrls: ['./person-make-payment-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonMakePaymentBodyComponent implements OnInit {
  @Input() totalPrice: number;
  currentDate: string;
  moneyOptions: BaseListItem[];

  constructor() {}

  ngOnInit(): void {
    this.currentDate = Date.now().toString();
    this.moneyOptions = [
      {
        id: 0,
        value: 'USD',
      },
      {
        id: 1,
        value: 'LBP',
      },
    ];
  }
}
