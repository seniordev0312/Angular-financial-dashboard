import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseListItem } from '@root/shared/models/base-list-item.model';

@Component({
  selector: 'app-till-view',
  templateUrl: './till-view.component.html',
  styleUrls: ['./till-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TillViewComponent implements OnInit {
  currencyList: BaseListItem[] = [];
  additionalCurrency: boolean = false;
  viewCurrencyDetail: boolean = false;
  currentCurrency: string;

  constructor() {}

  ngOnInit(): void {}

  addCurrency() {
    this.currencyList.push({
      id: 1,
      value: 'LBP',
    });
    this.additionalCurrency = true;
  }
}
