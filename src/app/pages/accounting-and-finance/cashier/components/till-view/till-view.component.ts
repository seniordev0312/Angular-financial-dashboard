import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-till-view',
  templateUrl: './till-view.component.html',
  styleUrls: ['./till-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TillViewComponent implements OnInit {
  currencyList = [
    { id: 0, value: 'USD' },
    { id: 1, value: 'LBP' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
