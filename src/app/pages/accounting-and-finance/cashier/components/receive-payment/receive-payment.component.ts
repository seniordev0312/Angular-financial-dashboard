import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receive-payment',
  templateUrl: './receive-payment.component.html',
  styleUrls: ['./receive-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReceivePaymentComponent implements OnInit {
  cardIconURLs: string[] = [
    '../../../../../../assets/images/cashier-icons/credit-card-selected.svg',
    '../../../../../../assets/images/cashier-icons/credit-card-svg.svg',
  ];
  checkIconURLs: string[] = [
    '../../../../../../assets/images/cashier-icons/check-svgrepo-selected.svg',
    '../../../../../../assets/images/cashier-icons/check-svgrepo-c.svg',
  ];
  cashIconURLs: string[] = [
    '../../../../../../assets/images/cashier-icons/cash-svgrepo-selected.svg',
    '../../../../../../assets/images/cashier-icons/cash-svgrepo-co.svg',
  ];
  cardFontColors: string[] = ['', 'text-[#365D7D]'];
  checkFontColors: string[] = ['', 'text-[#365D7D]'];
  cashFontColors: string[] = ['', 'text-[#365D7D]'];

  cardIconUrl: string;
  checkIconUrl: string;
  cashIconUrl: string;
  cardFontColor: string;
  checkFontColor: string;
  cashFontColor: string;

  constructor() {}

  ngOnInit(): void {
    this.cardIconUrl = this.cardIconURLs[1];
    this.cardFontColor = this.cardFontColors[1];
    this.checkIconUrl = this.checkIconURLs[0];
    this.cardFontColor = this.cardFontColors[1];
    this.checkFontColor = this.checkFontColors[0];
    this.cashFontColor = this.cashFontColors[0];
  }

  changeStatus(status: number) {
    if (status === 0) {
      this.cardIconUrl = this.cardIconURLs[1];
      this.checkIconUrl = this.checkIconURLs[0];
      this.cardIconUrl = this.cashIconURLs[0];
      this.cardFontColor = this.cardFontColors[1];
      this.checkFontColor = this.checkFontColors[0];
      this.cashFontColor = this.cashFontColors[0];
    } else if (status === 1) {
      this.cardIconUrl = this.cardIconURLs[0];
      this.checkIconUrl = this.checkIconURLs[1];
      this.cardIconUrl = this.cashIconURLs[0];
      this.cardFontColor = this.cardFontColors[0];
      this.checkFontColor = this.checkFontColors[1];
      this.cashFontColor = this.cashFontColors[0];
    } else if (status == 2) {
      this.cardIconUrl = this.cardIconURLs[0];
      this.checkIconUrl = this.checkIconURLs[0];
      this.cardIconUrl = this.cashIconURLs[1];
      this.cardFontColor = this.cardFontColors[0];
      this.checkFontColor = this.checkFontColors[0];
      this.cashFontColor = this.cashFontColors[1];
    }
  }
}
