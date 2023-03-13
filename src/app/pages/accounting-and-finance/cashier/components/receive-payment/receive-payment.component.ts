import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receive-payment',
  templateUrl: './receive-payment.component.html',
  styleUrls: ['./receive-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReceivePaymentComponent implements OnInit {
  printModal: boolean = false;
  cardIconURLs: string[] = [
    '../../../../../../assets/images/cashier-icons/card.svg',
    '../../../../../../assets/images/cashier-icons/selected-card.svg',
  ];
  checkIconURLs: string[] = [
    '../../../../../../assets/images/cashier-icons/check.svg',
    '../../../../../../assets/images/cashier-icons/selected-check.svg',
  ];
  cashIconURLs: string[] = [
    '../../../../../../assets/images/cashier-icons/cash.svg',
    '../../../../../../assets/images/cashier-icons/selected-cash.svg',
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
  status: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.cardIconUrl = this.cardIconURLs[1];
    this.cardFontColor = this.cardFontColors[0];
    this.checkIconUrl = this.checkIconURLs[0];
    this.cardFontColor = this.cardFontColors[1];
    this.checkFontColor = this.checkFontColors[0];
    this.cashFontColor = this.cashFontColors[0];
  }

  changeStatus(status: string) {
    this.status = Number(status);
    if (this.status === 0) {
      this.cardIconUrl = this.cardIconURLs[1];
      this.checkIconUrl = this.checkIconURLs[0];
      this.cardIconUrl = this.cashIconURLs[0];
      this.cardFontColor = this.cardFontColors[1];
      this.checkFontColor = this.checkFontColors[0];
      this.cashFontColor = this.cashFontColors[0];
    } else if (this.status === 1) {
      this.cardIconUrl = this.cardIconURLs[0];
      this.checkIconUrl = this.checkIconURLs[1];
      this.cardIconUrl = this.cashIconURLs[0];
      this.cardFontColor = this.cardFontColors[0];
      this.checkFontColor = this.checkFontColors[1];
      this.cashFontColor = this.cashFontColors[0];
    } else if (this.status == 2) {
      this.cardIconUrl = this.cardIconURLs[0];
      this.checkIconUrl = this.checkIconURLs[0];
      this.cardIconUrl = this.cashIconURLs[1];
      this.cardFontColor = this.cardFontColors[0];
      this.checkFontColor = this.checkFontColors[0];
      this.cashFontColor = this.cashFontColors[1];
    }
  }
}
